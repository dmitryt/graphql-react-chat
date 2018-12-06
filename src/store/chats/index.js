import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation, prepareSubscription } from '../utils';

import {
  CHATS_QUERY,
  CHAT_FILTERS_QUERY,
  CHAT_FILTERS_MUTATION,
  CREATE_CHAT_MUTATION,
  CREATE_CHAT_SUBSCRIPTION,
  DELETE_CHAT_MUTATION,
  DELETE_CHAT_SUBSCRIPTION,
} from './queries';
import {
  createChatConfig,
  deleteChatConfig,
  chatsQueryConfig,
  chatFiltersMutationConfig,
  createChatSubscriptionHandler,
  removeChatSubscriptionHandler,
} from './configs';

const queryName = 'chats';
const withChatsQuery = compose(
  prepareQuery(CHATS_QUERY, queryName, chatsQueryConfig),
  prepareSubscription(
    CREATE_CHAT_SUBSCRIPTION,
    queryName,
    'chatAdded',
    createChatSubscriptionHandler,
  ),
  prepareSubscription(
    DELETE_CHAT_SUBSCRIPTION,
    queryName,
    'chatDeleted',
    removeChatSubscriptionHandler,
  ),
);

export const withChats = compose(
  withRouter,
  prepareMutation(CHAT_FILTERS_MUTATION, 'chatFiltersMutation', chatFiltersMutationConfig),
  prepareQuery(CHAT_FILTERS_QUERY, 'chatFilters'),
  withChatsQuery,
  prepareMutation(CREATE_CHAT_MUTATION, 'createChatMutation', createChatConfig),
  prepareMutation(DELETE_CHAT_MUTATION, 'deleteChatMutation', deleteChatConfig),
);
