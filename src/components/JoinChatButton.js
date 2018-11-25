import React from 'react';
import Button from 'material-ui/Button';

const JoinChatButton = ({ onClick, title, disabled }) => (
  <Button variant="raised" color="primary" onClick={onClick} disabled={disabled} fullWidth>
    {title}
  </Button>
);

export default JoinChatButton;
