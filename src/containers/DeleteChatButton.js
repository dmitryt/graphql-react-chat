import { compose, withHandlers, mapProps } from 'recompose';

import { withChats } from '../store/chats';

import MenuItemButton from '../components/MenuItemButton';

export default compose(
  withChats,
  withHandlers({
    onClick: ({ deleteChatMutation, chatId }) => () => {
      deleteChatMutation({ id: chatId });
    },
  }),
  mapProps(({ loading, ...rest }) => ({
    ...rest,
    disabled: loading,
  })),
)(MenuItemButton);
