import gql from 'graphql-tag';

export const BASE_CHAT_FRAGMENT = gql`
  fragment BaseChat on Chat {
    _id
    title
    createdAt
    updatedAt
    members {
      _id
    }
  }
`;
