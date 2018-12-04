import gql from 'graphql-tag';

import { BASE_CHAT_FRAGMENT } from '../chats/fragments';

export const BASE_MESSAGE_FRAGMENT = gql`
  fragment BaseMessage on Message {
    _id
    content
    createdAt
    chatId
    isStatusMessage
    sender {
      _id
      username
    }
  }
`;

export const ACTIVE_CHAT_FRAGMENT = gql`
  fragment ActiveChat on Chat {
    ...BaseChat
    isChatMember
    isChatCreator
    messages {
      ...BaseMessage
    }
  }
  ${BASE_CHAT_FRAGMENT}
  ${BASE_MESSAGE_FRAGMENT}
`;
