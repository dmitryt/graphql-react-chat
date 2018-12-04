import gql from 'graphql-tag';

import { BASE_USER_FRAGMENT } from '../user/fragments';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      ...BaseUser
    }
  }
  ${BASE_USER_FRAGMENT}
`;
