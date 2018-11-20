import { graphql, compose } from 'react-apollo';
import { mapProps } from 'recompose';
import { withRouter } from 'react-router';
import get from 'lodash/get';

import { ACTIVE_CHAT_QUERY } from '../queries/chat';

export default compose(
  withRouter,
  mapProps(({ match: { params: { chatId } } }) => ({
    activeChatId: chatId,
  })),
  graphql(ACTIVE_CHAT_QUERY, {
    skip: ({ activeChatId }) => !activeChatId,
    options: ({ activeChatId }) => ({
      variables: {
        id: activeChatId,
      },
    }),
  }),
);
