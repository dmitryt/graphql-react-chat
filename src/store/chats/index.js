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
import { createChatConfig, deleteChatConfig, chatsQueryConfig } from './configs';

export const withChats = compose(
  withRouter,
  prepareQuery(CHAT_FILTERS_QUERY, 'chatFilters'),
  prepareMutation(CHAT_FILTERS_MUTATION, 'chatFiltersMutation'),
  prepareQuery(CHATS_QUERY, 'chats', chatsQueryConfig),
  prepareMutation(CREATE_CHAT_MUTATION, 'createChatMutation', createChatConfig),
  prepareMutation(DELETE_CHAT_MUTATION, 'deleteChatMutation', deleteChatConfig),
);
