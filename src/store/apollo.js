export default {
  resolvers: {
    Query: {},
    Mutation: {
      setActiveChatId(_, { id }, { cache }) {
        const data = { activeChatId: id };
        cache.writeData({ data });
        return data;
      },
    },
  },
  defaults: {
    activeChat: null,
  },
};
