import { prepareMutation } from '../utils';

import { LOGIN_MUTATION } from './queries';
import { loginConfig } from './configs';

export const withAuth = prepareMutation(LOGIN_MUTATION, 'loginMutation', loginConfig);
