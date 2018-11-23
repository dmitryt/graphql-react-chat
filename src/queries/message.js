import { gql } from 'apollo-boost';

export const BASE_MESSAGE_FRAGMENT = gql`
  fragment BaseMessage on Message {
    _id
    content
    createdAt
    chatId
    sender {
      _id
      username
    }
  }
`;

export const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE_MUTATION($input: NewMessage!) {
    addMessage(input: $input) {
      ...BaseMessage
    }
  }
  ${BASE_MESSAGE_FRAGMENT}
`;
