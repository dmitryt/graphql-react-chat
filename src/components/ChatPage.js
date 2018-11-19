import React from 'react';
import PropTypes from 'prop-types';
import NotificationSystem from 'react-notification-system';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';

import SideBar from '../containers/Sidebar';
import ChatContent from '../containers/ChatContent';

import ChatHeader from '../components/ChatHeader';
import withCreateChat from '../hocs/withCreateChat';

import CreateChatForm from './forms/CreateChatForm';
import EditProfileForm from './forms/EditProfileForm';
import MessageInput from '../components/MessageInput';
import AddChatBtn from '../components/AddChatBtn';
import { userShape, activeChatShape, notificationShape } from '../shapes';

const CreateChatFormWithMutation = withCreateChat(CreateChatForm);

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
    const {
      fetchAllChats, fetchMyChats, match, setActiveChat, initWsConnection,
    } = this.props;
    const { chatId } = match.params;
    initWsConnection();
    fetchAllChats();
    fetchMyChats();
    if (chatId) {
      setActiveChat({ chatId });
    }
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
    this.setState({ chatId });
  };

  closeProfileDialog = () => {
    this.setState({ isProfileDialogOpened: false });
  };

  openProfileDialog = () => {
    this.setState({ isProfileDialogOpened: true });
  };

  closeChatDialog = () => {
    this.setState({ isChatDialogOpened: false });
  };

  openChatDialog = () => {
    this.setState({ isChatDialogOpened: true });
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
      isChatMember,
      redirectToChatsList,
      // isConnected,
    } = this.props;
    const { isChatDialogOpened, isProfileDialogOpened, chatId } = this.state;
    const disabled = false;
    return (
      <div className={classes.root}>
        <ChatHeader
          width={`calc(100% - ${sidebarWidth}px)`}
          activeChat={{}}
          activeChatId={chatId}
          logout={logout}
          isCreator
          isChatMember
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
            <MessageInput onSubmit={sendMessage} disabled={disabled} />
          ) : (
            <Button
              variant="raised"
              color="primary"
              onClick={joinChat}
              disabled={disabled}
              fullWidth
            >
              Join Chat
            </Button>
          )}
        </ChatContent>
        <NotificationSystem ref={this._notificationSystem} />
        <CreateChatFormWithMutation
          onMutationSuccess={this.closeChatDialog}
          open={isChatDialogOpened}
          onClose={this.closeChatDialog}
        />
        <EditProfileForm
          user={user}
          onSubmit={this.onEditProfile}
          open={isProfileDialogOpened}
          onClose={this.closeProfileDialog}
        />
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
  activeChat: activeChatShape,
  isChatMember: PropTypes.bool.isRequired,
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
  activeChat: null,
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
