import { compose } from 'react-apollo';

import { prepareMutation, prepareQuery } from '../utils';

import { SIGNUP_MUTATION, UPDATE_USER_MUTATION, CURRENT_USER_QUERY } from './queries';
// import { activeChatConfig } from './configs';

export const withUser = compose(
  prepareQuery(CURRENT_USER_QUERY, 'currentUser'),
  prepareMutation(UPDATE_USER_MUTATION, 'updateUserMutation'),
  prepareMutation(SIGNUP_MUTATION, 'signupMutation'),
);
