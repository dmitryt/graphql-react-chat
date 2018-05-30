const getType = key => Symbol(`auth/${key}`);

export default {
  SIGNUP_REQUEST: getType('SIGNUP_REQUEST'),
  SIGNUP_SUCCESS: getType('SIGNUP_SUCCESS'),
  SIGNUP_FAILURE: getType('SIGNUP_FAILURE'),

  LOGIN_REQUEST: getType('LOGIN_REQUEST'),
  LOGIN_SUCCESS: getType('LOGIN_SUCCESS'),
  LOGIN_FAILURE: getType('LOGIN_FAILURE'),

  LOGOUT_REQUEST: getType('LOGOUT_REQUEST'),
  LOGOUT_SUCCESS: getType('LOGOUT_SUCCESS'),
  LOGOUT_FAILURE: getType('LOGOUT_FAILURE'),

  RECEIVE_AUTH_REQUEST: getType('RECEIVE_AUTH_REQUEST'),
  RECEIVE_AUTH_SUCCESS: getType('RECEIVE_AUTH_SUCCESS'),
  RECEIVE_AUTH_FAILURE: getType('RECEIVE_AUTH_FAILURE'),

  UPDATE_USER_REQUEST: getType('UPDATE_USER_REQUEST'),
  UPDATE_USER_SUCCESS: getType('UPDATE_USER_SUCCESS'),
  UPDATE_USER_FAILURE: getType('UPDATE_USER_FAILURE'),
};
