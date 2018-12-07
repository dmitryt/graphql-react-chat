import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import { withStyles } from 'material-ui/styles';

import ChatContent from '../containers/ChatContent';
import ChatHeader from '../containers/ChatHeader';
import CreateChatForm from '../containers/CreateChatForm';
import JoinChatButton from '../containers/JoinChatButton';
import EditProfileForm from '../containers/EditProfileForm';
import MessageInput from '../containers/MessageInput';

import SideBar from '../components/SideBar';
import AddChatBtn from '../components/AddChatBtn';
import { userShape, activeChatShape, notificationShape } from '../shapes';

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
  constructor(props) {
    super(props);
    this._notificationSystem = React.createRef();
  }

  state = {
    isChatDialogOpened: false,
    isProfileDialogOpened: false,
  };

  componentDidMount() {
    const { fetchAllChats, fetchMyChats, initWsConnection } = this.props;
    initWsConnection();
    fetchAllChats();
    fetchMyChats();
  }

  componentDidUpdate(prevProps) {
    const {
      setActiveChat, match, activeChat, mountChat, unmountChat,
    } = this.props;
    const getChatId = chat => chat && chat._id;
    if (this.props.notification && prevProps.notification !== this.props.notification) {
      const { level, message } = this.props.notification;
      this._notificationSystem.current.addNotification({ message, level });
    }
    if (prevProps.match.params.chatId !== match.params.chatId && match.params.chatId) {
      setActiveChat({ chatId: match.params.chatId });
    }
    const prevChatId = getChatId(prevProps.activeChat);
    const currentChatId = getChatId(activeChat);
    if (prevChatId !== currentChatId) {
      if (prevChatId) {
        unmountChat(prevChatId);
      }
      if (currentChatId) {
        mountChat(currentChatId);
      }
    }
  }

  componentWillUnmount() {
    this.props.wsConnectionClose();
  }

  onCreateChat = (data) => {
    this.closeChatDialog();
    this.props.createChat(data);
  };

  onEditProfile = (data) => {
    this.closeProfileDialog();
    this.props.updateUser(data);
  };

  onChatSelect = (chatId) => {
    this.props.redirectToChat({ chatId });
  };

  onUserUpdate = (notificationRef) => {
    notificationRef.addNotification({
      message: 'Profile has been saved successfully',
      level: 'success',
    });
    this.closeProfileDialog();
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

  openProfileDialog = () => {
    this.setState({ isProfileDialogOpened: true });
  };

  closeProfileDialog = () => {
    this.setState({ isProfileDialogOpened: false });
  };

  render() {
    const {
      classes,
      logout,
      user,
      myChats,
      deleteChat,
      joinChat,
      leaveChat,
      activeChat,
      sendMessage,
      redirectToChatsList,
      // isConnected,
    } = this.props;
    const { isChatDialogOpened, isProfileDialogOpened } = this.state;
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
          redirectToChatsList={redirectToChatsList}
          openProfileDialog={this.openProfileDialog}
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
        <EditProfileForm open={isProfileDialogOpened} onMutationSuccess={this.onUserUpdate} />
      </div>
    );
  }
}

ChatPage.propTypes = {
  classes: PropTypes.object.isRequired,
  user: userShape,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  notification: notificationShape,
  // activeChat: activeChatShape,
  // isConnected: PropTypes.bool.isRequired,

  logout: PropTypes.func,
  createChat: PropTypes.func,
  fetchAllChats: PropTypes.func,
  fetchMyChats: PropTypes.func,
  redirectToChat: PropTypes.func,
  redirectToChatsList: PropTypes.func,
  joinChat: PropTypes.func,
  leaveChat: PropTypes.func,
  deleteChat: PropTypes.func,
  mountChat: PropTypes.func,
  unmountChat: PropTypes.func,
  setActiveChat: PropTypes.func,
  initWsConnection: PropTypes.func,
  wsConnectionClose: PropTypes.func,
  updateUser: PropTypes.func,
  sendMessage: PropTypes.func,
};

ChatPage.defaultProps = {
  notification: null,
  user: null,
  logout: () => {},
  createChat: () => {},
  fetchAllChats: () => {},
  fetchMyChats: () => {},
  redirectToChat: () => {},
  redirectToChatsList: () => {},
  joinChat: () => {},
  leaveChat: () => {},
  deleteChat: () => {},
  mountChat: () => {},
  unmountChat: () => {},
  setActiveChat: () => {},
  initWsConnection: () => {},
  wsConnectionClose: () => {},
  updateUser: () => {},
  sendMessage: () => {},
};

export default withStyles(styles)(ChatPage);
