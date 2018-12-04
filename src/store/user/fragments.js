import gql from 'graphql-tag';

export const BASE_USER_FRAGMENT = gql`
  fragment BaseUser on User {
    _id
    username
    firstName
    lastName
  }
`;
