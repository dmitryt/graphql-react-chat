import gql from 'graphql-tag';

export const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE_MUTATION($input: NewMessage!) {
    addMessage(input: $input) {
      _id
      content
      sender {
        _id
        username
        chatId
      }
    }
  }
`;

export default {};
