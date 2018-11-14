export default {
  resolvers: {
    Query: {
      // activeChat(_, variables, { cache }) {
      //   // const data = cache.read({ __typename: 'ActiveChat' });
      //   // console.log(data);
      //   return { some: 'data' };
      // },
    },
    Mutation: {
      selectChat(_, { id }, { cache }) {
        const data = { activeChatId: id, __typename: 'ActiveChat' };
        cache.writeData({ data });
      },
    },
  },
};
