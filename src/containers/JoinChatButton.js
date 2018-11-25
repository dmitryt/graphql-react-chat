import { compose, withHandlers, mapProps } from 'recompose';

import { withActiveChat } from '../store/activeChat';

import JoinChatButton from '../components/JoinChatButton';

export default compose(
  withActiveChat,
  withHandlers({
    onClick: ({ joinChatMutation, chatId }) => () => {
      joinChatMutation({ id: chatId });
    },
  }),
  mapProps(({ loading, ...rest }) => ({
    ...rest,
    disabled: loading,
  })),
)(JoinChatButton);
