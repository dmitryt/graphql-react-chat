import { compose, withHandlers, mapProps } from 'recompose';

import { withActiveChat } from '../store/activeChat';

import MenuItemButton from '../components/MenuItemButton';

export default compose(
  withActiveChat,
  withHandlers({
    onClick: ({ leaveChatMutation, chatId }) => () => {
      leaveChatMutation({ id: chatId });
    },
  }),
  mapProps(({ loading, ...rest }) => ({
    ...rest,
    disabled: loading,
  })),
)(MenuItemButton);
