import React from 'react';
import { MenuItem } from 'material-ui/Menu';

import withDeleteChat from '../hocs/withDeleteChat';

const DeleteChatButton = ({ mutate }) => <MenuItem onClick={mutate}>Delete</MenuItem>;

export default withDeleteChat(DeleteChatButton);
