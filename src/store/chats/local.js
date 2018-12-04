import gql from 'graphql-tag';

import { CHAT_FILTERS_QUERY } from './queries';

export const mutations = {
  setChatFilters: (_, variables, { cache }) => {
    const data = cache.readQuery({ query: CHAT_FILTERS_QUERY });
    const chatFilters = { ...data.chatFilters, ...variables.chatFilters };
    cache.writeData({ data: { chatFilters } });
    return chatFilters;
  },
};

export const queries = {};

export const typeDefs = gql`
  enum ChatType {
    all
    my
  }
  type ChatFilters {
    query: String
    type: ChatType
  }
  type Query {
    chatFilters: ChatFilters
  }
  type Mutation {
    setChatFilters(chatFilters: ChatFilters): ChatFilters
  }
`;

export const defaults = {
  chatFilters: {
    __typename: 'ChatFilters',
    query: '',
    type: 'all',
  },
};
