import { put, call, takeEvery, select } from 'redux-saga/effects';

import types from '../types';
import { api } from '../utils';
import { redirectTo } from './services';

export function* fetchMyChats({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchMyChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_MY_CHATS_SUCCESS, payload: json.chats });
  } catch (error) {
    yield put({ type: types.FETCH_MY_CHATS_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* fetchAllChats({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchAllChats, auth.token);
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_ALL_CHATS_SUCCESS, payload: json.chats });
  } catch (error) {
    yield put({ type: types.FETCH_ALL_CHATS_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* createChat({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.createChat, { data, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.CREATE_CHAT_SUCCESS, payload: json });
    const notificationData = { level: 'success', message: 'Chat has been created successfully' };
    yield put({ type: types.NOTIFICATION, data: notificationData });
  } catch (error) {
    yield put({ type: types.CREATE_CHAT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* joinChat({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.joinChat, { chatId: data.chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.JOIN_CHAT_SUCCESS, payload: json });
    const notificationData = { level: 'success', message: 'You have joined the chat successfully' };
    yield put({ type: types.NOTIFICATION, data: notificationData });
  } catch (error) {
    yield put({ type: types.JOIN_CHAT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* leaveChat({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.leaveChat, { chatId: data.chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.LEAVE_CHAT_SUCCESS, payload: json });
    const notificationData = { level: 'success', message: 'You have left the chat successfully' };
    yield put({ type: types.NOTIFICATION, data: notificationData });
  } catch (error) {
    yield put({ type: types.LEAVE_CHAT_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* setActiveChat(data) {
  try {
    yield redirectTo({ to: `/chats/${data.chatId}` });
  } catch (e) {
    yield unsetActiveChat();
  }
}

export function* unsetActiveChat() {
  yield redirectTo({ to: `/chats` });
}

export function* sendMessage({ data }) {
  try {
    const { auth, chats } = yield select();
    const json = yield call(api.sendMessage, { data, chatId: chats.activeId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.SEND_MESSAGE_SUCCESS, payload: json });
  } catch (error) {
    yield put({ type: types.SEND_MESSAGE_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

export function* fetchMessages({ data }) {
  try {
    const { auth } = yield select();
    const json = yield call(api.fetchChat, { chatId: data.chatId, token: auth.token });
    if (!json.success) {
      throw new Error(json.message);
    }
    yield put({ type: types.FETCH_MESSAGES_SUCCESS, payload: json.messages });
    return json;
  } catch (error) {
    yield put({ type: types.FETCH_MESSAGES_FAILURE, error });

    const data = { level: 'error', message: error.message };
    yield put({ type: types.NOTIFICATION, data });
  }
}

const chatSagas = [
  takeEvery(types.FETCH_MY_CHATS_REQUEST, fetchMyChats),
  takeEvery(types.FETCH_ALL_CHATS_REQUEST, fetchAllChats),
  takeEvery(types.CREATE_CHAT_REQUEST, createChat),
  takeEvery(types.JOIN_CHAT_REQUEST, joinChat),
  takeEvery(types.LEAVE_CHAT_REQUEST, leaveChat),
  takeEvery(types.SEND_MESSAGE_REQUEST, sendMessage),
  // takeEvery(types.SET_ACTIVE_CHAT_REQUEST, setActiveChat),
  takeEvery(types.FETCH_MESSAGES_REQUEST, fetchMessages),
];

export default chatSagas;
