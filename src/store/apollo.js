export default {
  resolvers: {
    Mutation: {
      selectChat(_, { id }, { cache }) {
        const data = { activeChatId: id, __typename: 'ActiveChat' };
        cache.writeData({ data });
      },
    },
  },
};
