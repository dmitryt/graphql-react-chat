import { mapProps } from 'recompose';
import get from 'lodash/get';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation, prepareSubscription } from '../utils';

import {
  ACTIVE_CHAT_QUERY,
  JOIN_CHAT_MUTATION,
  LEAVE_CHAT_MUTATION,
  ADD_MESSAGE_MUTATION,
  ADD_MESSAGE_SUBSCRIPTION,
} from './queries';
import { activeChatConfig, addMessageConfig, addMessageSubscriptionHandler } from './configs';

const queryName = 'chat';
const withChatQuery = compose(
  prepareQuery(ACTIVE_CHAT_QUERY, queryName, activeChatConfig),
  mapProps(props => ({
    ...props,
    activeChat: props.activeChat || props.chat,
    subscriptionParams: { id: get(props, 'activeChat.variables.id') },
  })),
  prepareSubscription(
    ADD_MESSAGE_SUBSCRIPTION,
    'activeChat',
    'messageAdded',
    addMessageSubscriptionHandler,
  ),
);

export const withActiveChat = compose(
  withRouter,
  withChatQuery,
  prepareMutation(ADD_MESSAGE_MUTATION, 'addMessageMutation', addMessageConfig),
  prepareMutation(JOIN_CHAT_MUTATION, 'joinChatMutation'),
  prepareMutation(LEAVE_CHAT_MUTATION, 'leaveChatMutation'),
);
