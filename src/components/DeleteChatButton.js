import React from 'react';
import { MenuItem } from 'material-ui/Menu';

import withDeleteChat from '../hocs/withDeleteChat';

const DeleteChatButton = ({ mutate, loading }) => (
  <MenuItem onClick={mutate} disabled={loading}>
    Delete
  </MenuItem>
);

export default withDeleteChat(DeleteChatButton);
