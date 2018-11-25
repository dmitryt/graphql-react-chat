import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery, prepareMutation } from '../utils';

import { CHATS_QUERY, CREATE_CHAT_MUTATION, DELETE_CHAT_MUTATION } from './queries';
import { createChatConfig, deleteChatConfig } from './configs';

export const withChats = compose(
  withRouter,
  prepareQuery(CHATS_QUERY, 'chats'),
  prepareMutation(CREATE_CHAT_MUTATION, 'createChatMutation', createChatConfig),
  prepareMutation(DELETE_CHAT_MUTATION, 'deleteChatMutation', deleteChatConfig),
);
