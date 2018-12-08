import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import get from 'lodash/get';

import Toolbar from 'material-ui/Toolbar';
import MUIAppBar from 'material-ui/AppBar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteChatButton from '../containers/DeleteChatButton';
import LeaveChatButton from '../containers/LeaveChatButton';
import EditProfileForm from '../containers/EditProfileForm';

const styles = () => ({
  flex: {
    flex: 1,
  },
  menuIcon: {
    color: 'white',
    '&:hover': {
      backgroundColor: 'inherit',
    },
  },
});

export class ChatHeader extends React.Component {
  state = {
    anchorElUser: null,
    anchorElChat: null,
    isProfileDialogOpened: false,
  };

  onLogout = () => {
    this.props.logout();
    this.handleMenuClose();
  };

  onEditProfile = () => {
    this.handleMenuClose();
    this.setState({ isProfileDialogOpened: true });
  };

  onChatDelete = (notificationRef) => {
    this.handleMenuClose();
    notificationRef.addNotification({
      message: 'You have deleted the chat successfully',
      level: 'success',
    });
  };

  onChatLeave = (notificationRef) => {
    this.handleMenuClose();
    notificationRef.addNotification({
      message: 'You have left the chat successfully',
      level: 'success',
    });
  };

  onUserUpdate = (notificationRef) => {
    notificationRef.addNotification({
      message: 'Profile has been saved successfully',
      level: 'success',
    });
    this.closeProfileDialog();
  };

  closeProfileDialog = () => {
    this.setState({ isProfileDialogOpened: false });
  };

  handleMenuOpen = ({ currentTarget }) => {
    const key = currentTarget.getAttribute('data-id');
    this.setState({ [key]: currentTarget });
  };

  handleMenuClose = () => {
    this.setState({
      anchorElUser: null,
      anchorElChat: null,
    });
  };

  render() {
    const {
      classes, width, activeChat, disabled,
    } = this.props;
    const isChatCreator = get(activeChat, 'data.isChatCreator');
    const isChatMember = get(activeChat, 'data.isChatMember');
    const { anchorElUser, anchorElChat, isProfileDialogOpened } = this.state;
    return (
      <Fragment>
        <MUIAppBar position="absolute" style={{ width }}>
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              {activeChat ? (
                <React.Fragment>
                  <span className="chat-title">{get(activeChat, 'data.title')}</span>
                  {isChatMember ? (
                    <IconButton
                      className={classes.menuIcon}
                      data-id="anchorElChat"
                      aria-label="More"
                      aria-owns={anchorElChat ? 'chat-menu' : null}
                      aria-haspopup="true"
                      disabled={disabled}
                      onClick={this.handleMenuOpen}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  ) : null}
                </React.Fragment>
              ) : null}
              <Menu
                id="chat-menu"
                anchorEl={anchorElChat}
                open={Boolean(anchorElChat)}
                onClose={this.handleMenuClose}
              >
                {' '}
                {isChatCreator ? (
                  <DeleteChatButton
                    title="Delete"
                    chatId={get(activeChat, 'data._id')}
                    onMutationSuccess={this.onChatDelete}
                  />
                ) : (
                  <LeaveChatButton
                    title="Leave"
                    chatId={get(activeChat, 'data._id')}
                    onMutationSuccess={this.onChatLeave}
                  />
                )}
              </Menu>
            </Typography>
            <div>
              <IconButton
                data-id="anchorElUser"
                aria-owns={anchorElUser ? 'user-menu' : null}
                aria-haspopup="true"
                color="inherit"
                disabled={disabled}
                onClick={this.handleMenuOpen}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="user-menu"
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.onEditProfile}>Edit Profile</MenuItem>
                <MenuItem onClick={this.onLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </MUIAppBar>
        <EditProfileForm
          open={isProfileDialogOpened}
          onClose={this.closeProfileDialog}
          onMutationSuccess={this.onUserUpdate}
        />
      </Fragment>
    );
  }
}

ChatHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  width: PropTypes.string,

  logout: PropTypes.func,
};

ChatHeader.defaultProps = {
  width: '300px',
  logout: () => {},
};
export default withStyles(styles)(ChatHeader);
