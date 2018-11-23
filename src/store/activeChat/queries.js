import { gql } from 'apollo-boost';

import { BASE_CHAT_FRAGMENT } from '../chats/fragments';
import { BASE_MESSAGE_FRAGMENT } from './fragments';

export const ACTIVE_CHAT_QUERY = gql`
  query ACTIVE_CHAT_QUERY($id: ID!) {
    chat(id: $id) {
      ...BaseChat
      messages {
        ...BaseMessage
      }
    }
  }
  ${BASE_CHAT_FRAGMENT}
  ${BASE_MESSAGE_FRAGMENT}
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE_MUTATION($input: NewMessage!) {
    addMessage(input: $input) {
      ...BaseMessage
    }
  }
  ${BASE_MESSAGE_FRAGMENT}
`;
