import React from 'react';
import debounce from 'lodash/debounce';

import { withChats } from '../store/chats';

import SearchInput from '../components/SearchInput';

const TIMEOUT = 300;

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange, TIMEOUT);
  }
  onChange = (query) => {
    const { chatFiltersMutation } = this.props;
    chatFiltersMutation({ chatFilters: { query } });
  };
  render() {
    return <SearchInput onChange={this.onChange} />;
  }
}

export default withChats(Container);
