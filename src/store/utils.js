import React from 'react';
import { graphql, compose } from 'react-apollo';

export const prepareQuery = (QUERY, name, config = {}) =>
  graphql(QUERY, {
    ...config,
    props: ({ data: { loading, error, ...dataRest }, ...rest }) =>
      (config.props || (args => args))({
        ...rest,
        [name]: {
          ...dataRest,
          data: dataRest[name],
          loading,
          error,
        },
      }),
  });

const withMutationState = handlerName => Component =>
  class extends React.Component {
    state = {
      loading: false,
      error: null,
    };
    componentDidMount() {
      this._isMounted = true;
    }
    componentWillUnmount() {
      this._isMounted = false;
    }
    _mutate = (variables) => {
      const { mutate, onMutationSuccess = () => {} } = this.props;
      this.setState({ loading: true });
      return mutate({ variables })
        .then(() => {
          if (this._isMounted) {
            this.setState({ error: null });
            onMutationSuccess();
          }
        })
        .finally(() => {
          if (this._isMounted) {
            this.setState({ loading: false });
          }
        });
    };
    render() {
      const props = {
        ...this.props,
        [handlerName]: this._mutate,
      };
      return <Component {...props} />;
    }
  };

export const prepareMutation = (MUTATION, name, config = {}) =>
  compose(
    graphql(MUTATION, config),
    withMutationState(name),
  );
