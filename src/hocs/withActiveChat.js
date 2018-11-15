import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const ACTIVE_CHAT_QUERY = gql`
  query {
    activeChat @client
  }
`;

const SET_ACTIVE_CHAT_MUTATION = gql`
  mutation($id: ID!) {
    setActiveChat(id: $id) @client
  }
`;

export default compose(
  graphql(ACTIVE_CHAT_QUERY),
  graphql(SET_ACTIVE_CHAT_MUTATION),
);
