import React from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { CHATS_QUERY } from '../components/SideBar';

export const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($title: String!) {
    createChat(input: { title: $title }) {
      _id
      title
      createdAt
    }
  }
`;

const withCreateChat = Component =>
  class extends React.Component {
    state = {};
    updateStore = (store, { data: { createChat } }) => {
      const { onMutationSuccess = () => {} } = this.props;
      if (!createChat) {
        return false;
      }
      const queryAttrs = { query: CHATS_QUERY, variables: { filter: '', type: 'all' } };
      const data = store.readQuery(queryAttrs);
      data.chats.push(createChat);
      store.writeQuery({ ...queryAttrs, data });
      onMutationSuccess();
    };
    render() {
      const { variables } = this.state;
      return (
        <Mutation mutation={CREATE_CHAT_MUTATION} variables={variables} update={this.updateStore}>
          {mutate => (
            <Component
              {...this.props}
              mutate={(data) => {
                this.setState({ variables: data }, mutate);
              }}
            />
          )}
        </Mutation>
      );
    }
  };

export default withCreateChat;
