import { gql } from 'apollo-boost';

export const BASE_USER_FRAGMENT = gql`
  fragment BaseUser on User {
    _id
    username
    firstName
    lastName
  }
`;
