import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation } from '../utils';

import {
  CHATS_QUERY,
  CHAT_FILTERS_QUERY,
  CHAT_FILTERS_MUTATION,
  CREATE_CHAT_MUTATION,
  DELETE_CHAT_MUTATION,
} from './queries';
import {
  createChatConfig,
  deleteChatConfig,
  chatsQueryConfig,
  chatFiltersMutationConfig,
} from './configs';

export const withChats = compose(
  withRouter,
  prepareMutation(CHAT_FILTERS_MUTATION, 'chatFiltersMutation', chatFiltersMutationConfig),
  prepareQuery(CHAT_FILTERS_QUERY, 'chatFilters'),
  prepareQuery(CHATS_QUERY, 'chats', chatsQueryConfig),
  prepareMutation(CREATE_CHAT_MUTATION, 'createChatMutation', createChatConfig),
  prepareMutation(DELETE_CHAT_MUTATION, 'deleteChatMutation', deleteChatConfig),
);
