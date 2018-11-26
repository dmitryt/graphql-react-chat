import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation } from '../utils';

import {
  ACTIVE_CHAT_QUERY,
  JOIN_CHAT_MUTATION,
  LEAVE_CHAT_MUTATION,
  ADD_MESSAGE_MUTATION,
} from './queries';
import { activeChatConfig, addMessageConfig } from './configs';

export const withActiveChat = compose(
  withRouter,
  prepareQuery(ACTIVE_CHAT_QUERY, 'chat', activeChatConfig),
  prepareMutation(ADD_MESSAGE_MUTATION, 'addMessageMutation', addMessageConfig),
  prepareMutation(JOIN_CHAT_MUTATION, 'joinChatMutation'),
  prepareMutation(LEAVE_CHAT_MUTATION, 'leaveChatMutation'),
);
