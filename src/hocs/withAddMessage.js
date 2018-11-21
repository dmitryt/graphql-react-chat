import { graphql, compose } from 'react-apollo';
import { mapProps } from 'recompose';
import get from 'lodash/get';

import { ADD_MESSAGE_MUTATION } from '../queries/message';
import { ACTIVE_CHAT_QUERY } from '../queries/chat';
import withMutation from './withMutation';
import withActiveChat from './withActiveChat';

export default compose(
  withActiveChat,
  mapProps(({ data, ...rest }) => ({
    ...rest,
    activeChatId: get(data, 'chat._id'),
  })),
  graphql(ADD_MESSAGE_MUTATION, {
    options: () => ({
      update: (store, { data: { addMessage } }) => {
        if (!addMessage) {
          return false;
        }
        const queryAttrs = { query: ACTIVE_CHAT_QUERY, variables: { id: addMessage.chatId } };
        const data = store.readQuery(queryAttrs);
        data.chat.messages.push(addMessage);
        store.writeQuery({ ...queryAttrs, data });
      },
    }),
  }),
  withMutation,
  mapProps(({ toggleMutation, activeChatId, ...rest }) => ({
    ...rest,
    toggleMutation: (content) => {
      toggleMutation({ input: { content, chatId: activeChatId } });
    },
  })),
);
