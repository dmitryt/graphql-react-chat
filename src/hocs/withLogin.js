import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

import { STORAGE_KEY_TOKEN } from '../config';

export const LOGIN_MUTATION = gql`
  mutation LOGIN_MUTATION($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

const withLogin = Component =>
  class extends React.Component {
    state = {};
    update = (_, { data: { login } }) => {
      const { onMutationSuccess = () => {} } = this.props;
      localStorage.setItem(STORAGE_KEY_TOKEN, login.token);
      onMutationSuccess();
    };
    render() {
      const { variables } = this.state;
      return (
        <Mutation mutation={LOGIN_MUTATION} variables={variables} update={this.update}>
          {(mutate, { loading, error }) => (
            <Fragment>
              {error && error.graphQLErrors.map(e => e.message).join(';')}
              <Component
                {...this.props}
                loading={loading}
                mutate={(data) => {
                  this.setState({ variables: data }, mutate);
                }}
              />
            </Fragment>
          )}
        </Mutation>
      );
    }
  };

export default withLogin;
