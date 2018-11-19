import { graphql, compose } from 'react-apollo';
import { mapProps } from 'recompose';
import get from 'lodash/get';

import { ACTIVE_CHAT_QUERY, SET_ACTIVE_CHAT_ID_MUTATION } from '../queries/chat';

export default compose(
  graphql(ACTIVE_CHAT_QUERY),
  graphql(SET_ACTIVE_CHAT_ID_MUTATION, {
    options: {
      refetchQueries: ({ data }) => {
        const activeChatId = get(data, 'setActiveChatId.activeChatId');
        return [
          {
            query: ACTIVE_CHAT_QUERY,
            variables: { id: activeChatId },
          },
        ];
      },
    },
  }),
  mapProps(({ mutate, ...rest }) => ({
    ...rest,
    setActiveChatId: mutate,
  })),
);
