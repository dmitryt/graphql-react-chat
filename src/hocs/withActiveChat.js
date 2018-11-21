import { graphql, compose } from 'react-apollo';
import { mapProps } from 'recompose';
import { withRouter } from 'react-router';

import { omitProps } from '../utils/common';

import { ACTIVE_CHAT_QUERY } from '../queries/chat';

export default compose(
  withRouter,
  mapProps(({ match: { params: { chatId } }, ...rest }) => ({
    ...rest,
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
  omitProps(['activeChatId']),
);
