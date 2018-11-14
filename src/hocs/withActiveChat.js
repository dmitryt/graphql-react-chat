import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';

const ACTIVE_CHAT_QUERY = gql`
  query {
    activeChat @client
  }
`;

const SELECT_CHAT_MUTATION = gql`
  mutation($id: ID!) {
    selectChat(id: $id) @client
  }
`;

export default compose(
  graphql(ACTIVE_CHAT_QUERY),
  graphql(SELECT_CHAT_MUTATION),
);
