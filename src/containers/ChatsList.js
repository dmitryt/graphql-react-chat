import { compose } from 'react-apollo';

import { withChats } from '../store/chats';
import { withActiveChat } from '../store/activeChat';

import ChatsList from '../components/ChatsList';

export default compose(
  withChats,
  withActiveChat,
)(ChatsList);
