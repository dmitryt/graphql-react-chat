import gql from 'graphql-tag';

import { ACTIVE_CHAT_FRAGMENT, BASE_MESSAGE_FRAGMENT } from './fragments';

export const ACTIVE_CHAT_QUERY = gql`
  query ACTIVE_CHAT_QUERY($id: ID!) {
    chat(id: $id) {
      ...ActiveChat
    }
  }
  ${ACTIVE_CHAT_FRAGMENT}
`;

export const JOIN_CHAT_MUTATION = gql`
  mutation JOIN_CHAT_MUTATION($id: ID!) {
    joinChat(id: $id) {
      ...ActiveChat
    }
  }
  ${ACTIVE_CHAT_FRAGMENT}
`;

export const LEAVE_CHAT_MUTATION = gql`
  mutation LEAVE_CHAT_MUTATION($id: ID!) {
    leaveChat(id: $id) {
      ...ActiveChat
    }
  }
  ${ACTIVE_CHAT_FRAGMENT}
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE_MUTATION($input: NewMessage!) {
    addMessage(input: $input) {
      ...BaseMessage
    }
  }
  ${BASE_MESSAGE_FRAGMENT}
`;
