import { graphql, compose } from 'apollo-boost';

import { CHATS_QUERY } from './queries';

const store = {
  defaults: {},
  mutations,
  queries,
};

const withChats = compose(
  graphql(CHATS_QUERY, notesQueryHandler),
  graphql(updateNoteQuery, { name: 'updateNoteMutation' }),
  graphql(clearNoteQuery, { name: 'clearNoteMutation' }),
);

export default {
  store,
  withChats,
};
