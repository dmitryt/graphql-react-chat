import { prepareMutation, prepareQuery } from '../utils';

import { UPDATE_USER_MUTATION, CURRENT_USER_QUERY } from './queries';

export const withUser = prepareMutation(UPDATE_USER_MUTATION, 'updateUserMutation');
export const withCurrentUser = prepareQuery(CURRENT_USER_QUERY, 'currentUser');
