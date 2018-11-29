import React from 'react';
import { compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { withActiveChat } from '../store/activeChat';
import ChatHeader from '../components/ChatHeader';
import { STORAGE_KEY_TOKEN } from '../config';

class Container extends React.Component {
  logout = () => {
    const { history } = this.props;
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    history.push('/');
  };
  render() {
    return <ChatHeader {...this.props} logout={this.logout} />;
  }
}

export default compose(
  withRouter,
  withActiveChat,
)(Container);
