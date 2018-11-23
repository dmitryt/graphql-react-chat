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
};
