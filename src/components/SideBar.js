import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import debounce from 'lodash/debounce';

import Divider from 'material-ui/Divider';

import NavBar from './NavBar';
import SearchInput from './SearchInput';
import ChatsList from '../containers/ChatsList';

const styles = () => ({
  root: {
    position: 'relative',
  },
});

const TIMEOUT = 300;

export class SideBar extends React.Component {
  constructor(props) {
    super(props);
    this.onFilterChange = debounce(this.onFilterChange, TIMEOUT);
  }

  state = {
    chatsType: 'all',
    filter: '',
  };

  onTypeChange = (e, chatsType) => {
    this.setState({ chatsType });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  // getChats() {
  //   const { myChats } = this.props;
  //   const { chatsType, filter } = this.state;
  //   return filterAndSortChats(chatsType === 'my' ? myChats : allChats, filter);
  // }

  render() {
    const {
      classes, width, disabled, children,
    } = this.props;
    // debugger;
    const { chatsType, filter } = this.state;
    return (
      <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
        <SearchInput onChange={this.onFilterChange} />
        <Divider />
        <ChatsList onSelect={this.onChatSelect} disabled={disabled} />
        {children}
        <NavBar chatsType={chatsType} onChange={this.onTypeChange} />
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
