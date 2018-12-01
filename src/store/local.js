import { defaults, queries, mutations, typeDefs } from './chats/local';

export default {
  defaults,
  typeDefs,
  resolvers: {
    Query: queries,
    Mutation: mutations,
  },
};
