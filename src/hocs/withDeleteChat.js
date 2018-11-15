import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { CHATS_QUERY } from '../components/SideBar';
import withMutation from './withMutation';

export const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($id: ID!) {
    deleteChat(id: $id)
  }
`;

export default compose(
  graphql(DELETE_CHAT_MUTATION, {
    options: {
      update: (store, { data: { deleteChat } }) => {
        if (!deleteChat) {
          return false;
        }
        const { id } = this.props;
        const queryAttrs = { query: CHATS_QUERY, variables: { filter: '', type: 'all' } };
        const data = store.readQuery(queryAttrs);
        data.chats = data.chats.filter(({ _id }) => _id !== id);
        store.writeQuery({ ...queryAttrs, data });
      },
    },
  }),
  withMutation,
);
