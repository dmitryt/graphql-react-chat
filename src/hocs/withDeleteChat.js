import { compose, withHandlers } from 'recompose';
import { graphql } from 'react-apollo';

import { CHATS_QUERY, DELETE_CHAT_MUTATION } from '../queries/chat';
import withMutation from './withMutation';
import withActiveChat from './withActiveChat';

export default compose(
  withActiveChat,
  graphql(DELETE_CHAT_MUTATION, {
    options: props => ({
      update: (store, { data: { deleteChat } }) => {
        if (!deleteChat) {
          return false;
        }
        const {
          setActiveChatId,
          data: { activeChat },
        } = props;
        const queryAttrs = { query: CHATS_QUERY, variables: { type: null, filter: null } };
        const data = store.readQuery(queryAttrs);
        data.chats = data.chats.filter(({ _id }) => _id !== activeChat._id);
        store.writeQuery({ ...queryAttrs, data });
        setActiveChatId({ variables: { id: null } });
      },
    }),
  }),
  withMutation,
  withHandlers({
    toggleMutation: ({ toggleMutation, data: { activeChat } }) => () => {
      toggleMutation({ id: activeChat._id });
    },
  }),
);
