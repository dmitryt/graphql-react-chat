import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareMutation } from '../utils';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from './queries';
import { loginConfig } from './configs';

export const withAuth = compose(
  withRouter,
  prepareMutation(LOGIN_MUTATION, 'loginMutation', loginConfig),
  prepareMutation(SIGNUP_MUTATION, 'signupMutation'),
);
