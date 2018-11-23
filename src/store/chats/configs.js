import { CHATS_QUERY } from './queries';

export const createChatConfig = {
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
};

export const deleteChatConfig = {
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
};
