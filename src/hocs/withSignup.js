import gql from 'graphql-tag';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import withMutation from './withMutation';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      _id
      username
    }
  }
`;

export default compose(
  graphql(SIGNUP_MUTATION, {
    options: {
      update: (_, { data: { signup } }) => {
        console.log(signup);
      },
    },
  }),
  withMutation,
);
