const getType = key => Symbol(`chats/${key}`);

export default {
  FETCH_MY_CHATS_REQUEST: getType('FETCH_MY_CHATS_REQUEST'),
  FETCH_MY_CHATS_SUCCESS: getType('FETCH_MY_CHATS_SUCCESS'),
  FETCH_MY_CHATS_FAILURE: getType('FETCH_MY_CHATS_FAILURE'),

  FETCH_ALL_CHATS_REQUEST: getType('FETCH_ALL_CHATS_REQUEST'),
  FETCH_ALL_CHATS_SUCCESS: getType('FETCH_ALL_CHATS_SUCCESS'),
  FETCH_ALL_CHATS_FAILURE: getType('FETCH_ALL_CHATS_FAILURE'),

  CREATE_CHAT_REQUEST: getType('CREATE_CHAT_REQUEST'),
  CREATE_CHAT_SUCCESS: getType('CREATE_CHAT_SUCCESS'),
  CREATE_CHAT_FAILURE: getType('CREATE_CHAT_FAILURE'),

  DELETE_CHAT_REQUEST: getType('DELETE_CHAT_REQUEST'),
  DELETE_CHAT_SUCCESS: getType('DELETE_CHAT_SUCCESS'),
  DELETE_CHAT_FAILURE: getType('DELETE_CHAT_FAILURE'),

  JOIN_CHAT_REQUEST: getType('JOIN_CHAT_REQUEST'),
  JOIN_CHAT_SUCCESS: getType('JOIN_CHAT_SUCCESS'),
  JOIN_CHAT_FAILURE: getType('JOIN_CHAT_FAILURE'),

  LEAVE_CHAT_REQUEST: getType('LEAVE_CHAT_REQUEST'),
  LEAVE_CHAT_SUCCESS: getType('LEAVE_CHAT_SUCCESS'),
  LEAVE_CHAT_FAILURE: getType('LEAVE_CHAT_FAILURE'),

  SEND_MESSAGE_REQUEST: getType('SEND_MESSAGE_REQUEST'),
  SEND_MESSAGE_SUCCESS: getType('SEND_MESSAGE_SUCCESS'),
  SEND_MESSAGE_FAILURE: getType('SEND_MESSAGE_FAILURE'),

  FETCH_ACTIVE_CHAT_REQUEST: getType('FETCH_ACTIVE_CHAT_REQUEST'),
  FETCH_ACTIVE_CHAT_SUCCESS: getType('FETCH_ACTIVE_CHAT_SUCCESS'),
  FETCH_ACTIVE_CHAT_FAILURE: getType('FETCH_ACTIVE_CHAT_FAILURE'),
};