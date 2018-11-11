import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

export const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($username: String!, $password: String!) {
    signup(username: $username, password: $password) {
      _id
      username
    }
  }
`;

const withLogin = Component =>
  class extends React.Component {
    state = {};
    render() {
      const { onMutationSuccess = () => {} } = this.props;
      const { variables } = this.state;
      return (
        <Mutation mutation={SIGNUP_MUTATION} variables={variables} update={onMutationSuccess}>
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
