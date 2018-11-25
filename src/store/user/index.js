import { compose } from 'react-apollo';

import { prepareMutation } from '../utils';

import { SIGNUP_MUTATION } from './queries';
// import { activeChatConfig } from './configs';

export const withActiveChat = compose(prepareMutation(SIGNUP_MUTATION, 'signupMutation'));
