import React from 'react';

import { withChats } from '../store/chats';

import NavBar from '../components/NavBar';

class Container extends React.Component {
  onChange = (e, type) => {
    const { chatFiltersMutation } = this.props;
    chatFiltersMutation({ chatFilters: { type } });
  };
  render() {
    const {
      chatFilters: {
        data: { type },
      },
    } = this.props;
    return <NavBar chatsType={type} onChange={this.onChange} />;
  }
}

export default withChats(Container);
