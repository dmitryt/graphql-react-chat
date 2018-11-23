import { gql } from 'apollo-boost';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { STORAGE_KEY_TOKEN } from '../config';
import withMutation from './withMutation';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export default compose(
  graphql(LOGIN_MUTATION, {
    options: {
      update: (_, { data: { login } }) => {
        if (login.token) {
          localStorage.setItem(STORAGE_KEY_TOKEN, login.token);
        }
      },
    },
  }),
  withMutation,
);
