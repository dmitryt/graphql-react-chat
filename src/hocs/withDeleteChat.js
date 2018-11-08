import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CHATS_QUERY } from '../components/SideBar';

export const DELETE_CHAT_MUTATION = gql`
  mutation DELETE_CHAT_MUTATION($id: ID!) {
    deleteChat(id: $id)
  }
`;

const withDeleteChat = Component =>
  class extends React.Component {
    updateStore = (store, { data: { deleteChat } }) => {
      if (!deleteChat) {
        return false;
      }
      const { id } = this.props;
      const queryAttrs = { query: CHATS_QUERY, variables: { filter: '', type: 'all' } };
      const data = store.readQuery(queryAttrs);
      data.chats = data.chats.filter(({ _id }) => _id !== id);
      store.writeQuery({ ...queryAttrs, data });
    };
    render() {
      const { id } = this.props;
      return (
        <Mutation mutation={DELETE_CHAT_MUTATION} variables={{ id }} update={this.updateStore}>
          {mutate => <Component {...this.props} mutate={mutate} />}
        </Mutation>
      );
    }
  };

export default withDeleteChat;
