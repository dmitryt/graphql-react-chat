import { ACTIVE_CHAT_QUERY } from './queries';

export const activeChatConfig = {
  options: ({
    match: {
      params: { chatId },
    },
  }) => ({
    variables: {
      id: chatId,
    },
  }),
  skip: ({
    match: {
      params: { chatId },
    },
  }) => !chatId,
  props: ({ chat, ...rest }) => ({
    ...rest,
    activeChat: chat,
  }),
};

export const addMessageConfig = {
  options: {
    update: (store, { data: { addMessage } }) => {
      if (!addMessage) {
        return false;
      }
      const queryAttrs = { query: ACTIVE_CHAT_QUERY, variables: { id: addMessage.chatId } };
      const data = store.readQuery(queryAttrs);
      data.chat.messages.push(addMessage);
      store.writeQuery({ ...queryAttrs, data });
    },
  },
};
