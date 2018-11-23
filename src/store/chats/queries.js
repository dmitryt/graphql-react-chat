import { gql } from 'apollo-boost';

import { BASE_CHAT_FRAGMENT } from './fragments';

export const CHATS_QUERY = gql`
  query CHATS_QUERY($type: String, $filter: String) {
    chats(type: $type, filter: $filter) {
      ...BaseChat
    }
  }
  ${BASE_CHAT_FRAGMENT}
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($title: String!) {
    createChat(input: { title: $title }) {
      ...BaseChat
    }
  }
  ${BASE_CHAT_FRAGMENT}
`;

export const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($id: ID!) {
    deleteChat(id: $id)
  }
`;
