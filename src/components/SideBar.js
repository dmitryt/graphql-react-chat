import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import { withStyles } from 'material-ui/styles';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import debounce from 'lodash/debounce';

import Divider from 'material-ui/Divider';

import NavBar from './NavBar';
import SearchInput from './SearchInput';
import ChatsList from './ChatsList';

import { activeChatShape } from '../shapes';

const styles = () => ({
  root: {
    position: 'relative',
  },
});

export const CHATS_QUERY = gql`
  query CHATS_QUERY($type: String!, $filter: String) {
    chats(type: $type, filter: $filter) {
      _id
      title
      createdAt
    }
  }
`;

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
      classes, width, onChatSelect, activeChat, disabled, children,
    } = this.props;
    const { chatsType, filter } = this.state;
    return (
      <Drawer variant="permanent" style={{ width }} classes={{ paper: classes.root }}>
        <SearchInput onChange={this.onFilterChange} />
        <Divider />
        <Query query={CHATS_QUERY} variables={{ type: chatsType, filter }}>
          {({ data: { chats = [] } }) => (
            <ChatsList
              chats={chats}
              onSelect={onChatSelect}
              activeChat={activeChat}
              disabled={disabled}
            />
          )}
        </Query>
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
  activeChat: activeChatShape,
  width: PropTypes.number,
  onChatSelect: PropTypes.func,
};

SideBar.defaultProps = {
  activeChat: null,
  width: 300,
  onChatSelect: () => {},
};

export default withStyles(styles)(SideBar);
