import { gql } from 'apollo-boost';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      _id
      username
    }
  }
`;
