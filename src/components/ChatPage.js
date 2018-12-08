import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { withStyles } from 'material-ui/styles';

import ChatContent from '../containers/ChatContent';
import ChatHeader from '../containers/ChatHeader';
import CreateChatForm from '../containers/CreateChatForm';
import JoinChatButton from '../containers/JoinChatButton';
import MessageInput from '../containers/MessageInput';

import SideBar from '../components/SideBar';
import AddChatBtn from '../components/AddChatBtn';

const sidebarWidth = 320;

const styles = () => ({
  root: {
    height: '100%',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
});

export class ChatPage extends React.Component {
  state = {
    isChatDialogOpened: false,
  };

  onCreateChat = (data) => {
    this.closeChatDialog();
    this.props.createChat(data);
  };

  onChatSelect = (chatId) => {
    this.props.redirectToChat({ chatId });
  };

  onChatJoin = (notificationRef) => {
    notificationRef.addNotification({
      message: 'You have joined the chat successfully',
      level: 'success',
    });
  };

  onChatCreate = (notificationRef) => {
    notificationRef.addNotification({
      message: 'Chat has been created successfully',
      level: 'success',
    });
    this.closeChatDialog();
  };

  closeChatDialog = () => {
    this.setState({ isChatDialogOpened: false });
  };

  openChatDialog = () => {
    this.setState({ isChatDialogOpened: true });
  };

  render() {
    const {
      classes, logout, user, myChats, deleteChat, leaveChat, activeChat,
    } = this.props;
    const { isChatDialogOpened } = this.state;
    const disabled = false;
    const isChatMember = get(activeChat, 'data.isChatMember');
    return (
      <div className={classes.root}>
        <ChatHeader
          width={`calc(100% - ${sidebarWidth}px)`}
          logout={logout}
          disabled={disabled}
          deleteChat={deleteChat}
          leaveChat={leaveChat}
        />
        <SideBar
          width={sidebarWidth}
          onChatSelect={this.onChatSelect}
          disabled={disabled}
          myChats={myChats}
        >
          <AddChatBtn onClick={this.openChatDialog} disabled={disabled} />
        </SideBar>
        <ChatContent user={user} disabled={disabled}>
          {isChatMember ? (
            <MessageInput disabled={disabled} chatId={get(activeChat, 'data._id')} />
          ) : (
            <JoinChatButton
              title="Join Chat"
              onMutationSuccess={this.onChatJoin}
              chatId={get(activeChat, 'data._id')}
            />
          )}
        </ChatContent>
        <CreateChatForm
          onMutationSuccess={this.onChatCreate}
          open={isChatDialogOpened}
          onClose={this.closeChatDialog}
        />
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func,
  createChat: PropTypes.func,
  redirectToChat: PropTypes.func,
  leaveChat: PropTypes.func,
  deleteChat: PropTypes.func,
};

ChatPage.defaultProps = {
  logout: () => {},
  createChat: () => {},
  redirectToChat: () => {},
  leaveChat: () => {},
  deleteChat: () => {},
};

export default withStyles(styles)(ChatPage);
