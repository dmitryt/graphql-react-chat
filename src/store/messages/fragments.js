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

export default {};
