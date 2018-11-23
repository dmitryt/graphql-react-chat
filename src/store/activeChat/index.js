import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { prepareQuery } from '../utils';

import { ACTIVE_CHAT_QUERY } from './queries';
import { activeChatConfig } from './configs';

export const withActiveChat = compose(
  withRouter,
  prepareQuery(ACTIVE_CHAT_QUERY, 'activeChat', activeChatConfig),
);
