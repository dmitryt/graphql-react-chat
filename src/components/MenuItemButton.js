import React from 'react';
import { MenuItem } from 'material-ui/Menu';

const MenuItemButton = ({ onClick, title, disabled }) => (
  <MenuItem onClick={onClick} disabled={disabled}>
    {title}
  </MenuItem>
);

export default MenuItemButton;
