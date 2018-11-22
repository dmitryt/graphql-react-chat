import { gql } from 'apollo-boost';

import { BASE_MESSAGE_FRAGMENT } from './fragments';

export const ADD_MESSAGE_MUTATION = gql`
  mutation ADD_MESSAGE_MUTATION($input: NewMessage!) {
    addMessage(input: $input) {
      ...BaseMessage
    }
  }
  ${BASE_MESSAGE_FRAGMENT}
`;

export default {};
