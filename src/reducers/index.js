import { combineReducers } from 'redux';

import auth, { actions as authActions } from './auth';
import chats, { actions as chatsActions } from './chats';
import notification from './notification';

export const actions = {
  ...authActions,
  ...chatsActions,
};

export default combineReducers({
  auth,
  chats,
  notification,
});
