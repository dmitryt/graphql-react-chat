import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';

import Divider from 'material-ui/Divider';

import NavBar from './NavBar';
import SearchInput from '../containers/SearchInput';
import ChatsList from '../containers/ChatsList';

const styles = () => ({
  root: {
    position: 'relative',
  },
});

export class SideBar extends React.Component {
  render() {
    const {
      classes, width, disabled, children,
    } = this.props;
    return (
      <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
        <SearchInput />
        <Divider />
        <ChatsList onSelect={this.onChatSelect} disabled={disabled} />
        {children}
        <NavBar chatsType="all" onChange={this.onTypeChange} />
      </Drawer>
    );
  }
}

SideBar.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  width: PropTypes.number,
};

SideBar.defaultProps = {
  width: 300,
};

export default withStyles(styles)(SideBar);
