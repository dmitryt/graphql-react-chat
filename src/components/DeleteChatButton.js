import React from 'react';
import { MenuItem } from 'material-ui/Menu';

import withDeleteChat from '../hocs/withDeleteChat';

const DeleteChatButton = ({ toggleMutation, loading }) => (
  <MenuItem onClick={toggleMutation} disabled={loading}>
    Delete
  </MenuItem>
);

export default withDeleteChat(DeleteChatButton);
