import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation } from '../utils';

import { ACTIVE_CHAT_QUERY, JOIN_CHAT_MUTATION, LEAVE_CHAT_MUTATION } from './queries';
import { activeChatConfig } from './configs';

export const withActiveChat = compose(
  withRouter,
  prepareQuery(ACTIVE_CHAT_QUERY, 'chat', activeChatConfig),
  prepareMutation(JOIN_CHAT_MUTATION, 'joinChatMutation'),
  prepareMutation(LEAVE_CHAT_MUTATION, 'leaveChatMutation'),
);
