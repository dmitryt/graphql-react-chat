import { compose, withState } from 'recompose';
import { graphql } from 'react-apollo';

import { CHATS_QUERY, CREATE_CHAT_MUTATION } from '../queries/chat';
import withMutation from './withMutation';

export default compose(
  withState('isOpened', 'setIsOpened', ({ open }) => open),
  graphql(CREATE_CHAT_MUTATION, {
    options: () => ({
      update: (store, { data: { createChat } }) => {
        if (!createChat) {
          return false;
        }
        const queryAttrs = { query: CHATS_QUERY, variables: { type: null, filter: null } };
        const data = store.readQuery(queryAttrs);
        data.chats.push(createChat);
        store.writeQuery({ ...queryAttrs, data });
      },
    }),
  }),
  withMutation,
);
