import { CHATS_QUERY } from './queries';

export const createChatConfig = {
  options: ({ history }) => ({
    update: (store, { data: { createChat } }) => {
      if (!createChat) {
        return false;
      }
      const queryAttrs = { query: CHATS_QUERY, variables: { type: null, filter: null } };
      const data = store.readQuery(queryAttrs);
      data.chats.push(createChat);
      store.writeQuery({ ...queryAttrs, data });
      // TODO: move me
      history.push(`/chats/${createChat._id}`);
    },
  }),
};

export const deleteChatConfig = {
  options: ({ chatId, history }) => ({
    update: (store, { data: { deleteChat } }) => {
      if (!deleteChat) {
        return false;
      }
      const queryAttrs = { query: CHATS_QUERY, variables: { type: null, filter: null } };
      const data = store.readQuery(queryAttrs);
      data.chats = data.chats.filter(({ _id }) => _id !== chatId);
      store.writeQuery({ ...queryAttrs, data });
      // TODO: move me
      history.push('/chats');
    },
  }),
};

export const leaveChatConfig = {
  options: ({ chatId }) => ({
    update: (store, { data: { leaveChat } }) => {
      if (!leaveChat) {
        return false;
      }
      const queryAttrs = { query: CHATS_QUERY, variables: { type: null, filter: null } };
      const data = store.readQuery(queryAttrs);
      data.chats = data.chats.filter(({ _id }) => _id !== chatId);
      store.writeQuery({ ...queryAttrs, data });
    },
  }),
};
