import gql from 'graphql-tag';
import { compose, withState, lifecycle } from 'recompose';
import { graphql } from 'react-apollo';

import { CHATS_QUERY } from '../components/SideBar';
import withMutation from './withMutation';

export const CREATE_CHAT_MUTATION = gql`
  mutation CREATE_CHAT_MUTATION($title: String!) {
    createChat(input: { title: $title }) {
      _id
      title
      createdAt
    }
  }
`;

export default compose(
  withState('isOpened', 'setIsOpened', ({ open }) => open),
  lifecycle({
    componentDidUpdate(prevProps) {
      const { setIsOpened, open } = this.props;
      if (prevProps.open !== open) {
        setIsOpened(open);
      }
    },
  }),
  graphql(CREATE_CHAT_MUTATION, {
    options: ({ setIsOpened }) => ({
      update: (store, { data: { createChat } }) => {
        if (!createChat) {
          return false;
        }
        const queryAttrs = { query: CHATS_QUERY, variables: { filter: '', type: 'all' } };
        const data = store.readQuery(queryAttrs);
        data.chats.push(createChat);
        store.writeQuery({ ...queryAttrs, data });
        setIsOpened(false);
      },
    }),
  }),
  withMutation,
);
