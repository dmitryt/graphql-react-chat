import gql from 'graphql-tag';

export const MESSAGES_QUERY = gql`
  query MESSAGES_QUERY($chatId: ID!) {
    messages(chatId: $chatId) {
      _id
      content
      sender {
        _id
        name
      }
    }
  }
`;

export default {};
