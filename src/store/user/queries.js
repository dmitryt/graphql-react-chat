import gql from 'graphql-tag';

import { BASE_USER_FRAGMENT } from './fragments';

export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    currentUser {
      ...BaseUser
    }
  }
  ${BASE_USER_FRAGMENT}
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($firstName: String, $lastName: String) {
    updateUser(firstName: $firstName, lastName: $lastName) {
      ...BaseUser
    }
  }
  ${BASE_USER_FRAGMENT}
`;
