import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import get from 'lodash/get';

import UserMessage from './UserMessage';
import UserAction from './UserAction';
import InviteLabel from './InviteLabel';

import { userShape } from '../shapes';

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  bottomBox: {
    padding: theme.spacing.unit * 2,
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    width: `calc(100% - ${theme.spacing.unit * 4}px)`,
    bottom: 0,
    boxSizing: 'border-box',
  },
  content: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,
  },
  messagesList: {
    padding: `${theme.spacing.unit}px 0 ${theme.spacing.unit * 12}px`,
    height: `calc(100% - ${theme.spacing.unit * 21}px)`,
    overflow: 'auto',
  },
});

function prepareChatMessages(activeChat, user) {
  if (!activeChat) {
    return <InviteLabel />;
  }
  return activeChat.messages.map((item) => {
    const Component = item.isStatusMessage ? UserAction : UserMessage;
    return (
      <Component
        key={item._id}
        color="grey"
        user={item.sender}
        isCreator={item.sender && user ? item.sender._id === user._id : false}
        {...item}
      />
    );
  });
}

export class ChatContent extends React.Component {
  constructor(props) {
    super(props);
    this.messagesWrapperRef = React.createRef();
  }

  state = {};

  componentDidMount() {
    this.scrollDownHistory();
  }

  componentDidUpdate() {
    this.scrollDownHistory();
  }

  scrollDownHistory() {
    const node = this.messagesWrapperRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    const { classes, user, children } = this.props;
    const activeChat = get(this.props, 'activeChat.data');
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div className={classes.messagesList} ref={this.messagesWrapperRef}>
          {prepareChatMessages(activeChat, user)}
        </div>
        {activeChat ? (
          <Paper elevation={4} className={classes.bottomBox}>
            {children}
          </Paper>
        ) : null}
      </main>
    );
  }
}

ChatContent.propTypes = {
  classes: PropTypes.object.isRequired,
  user: userShape,
  children: PropTypes.object.isRequired,
};

ChatContent.defaultProps = {
  user: null,
};

export default withStyles(styles)(ChatContent);
