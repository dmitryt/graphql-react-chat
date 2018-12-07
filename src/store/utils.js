import React from 'react';
import { fromRenderProps } from 'recompose';
import { graphql, compose } from 'react-apollo';

import { NotificationContext } from '../context/notificationContext';

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
      const { mutate, notificationRef, onMutationSuccess = () => {} } = this.props;
      this.setState({ loading: true });
      return mutate({ variables })
        .then(() => {
          if (this._isMounted) {
            this.setState({ error: null });
          }
          onMutationSuccess(notificationRef.current);
        })
        .finally(() => {
          if (this._isMounted) {
            this.setState({ loading: false });
          }
        });
    };
    render() {
      const { notificationRef, ...rest } = this.props;
      const props = {
        ...rest,
        [handlerName]: this._mutate,
      };
      return <Component {...props} />;
    }
  };

export const prepareMutation = (MUTATION, name, config = {}) =>
  compose(
    graphql(MUTATION, config),
    fromRenderProps(NotificationContext.Consumer, notificationRef => ({ notificationRef })),
    withMutationState(name),
  );

// avoid multiple subscriptions, when component is initialized from different places
// found only this way how to do that
const isInited = {};
const withSubscriptionState = ({
  SUBSCRIPTION, queryName, sId, handler = a => a,
}) => Component =>
  // eslint-disable-next-line react/no-multi-comp
  class extends React.Component {
    // strange eslint bug
    // eslint-disable-next-line
    state = {
      subscriptionParams: {},
      unsubscribe: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps[queryName] && !nextProps[queryName].loading) {
        // avoid multiple subscription
        if (isInited[sId] && !prevState.unsubscribe) {
          return null;
        }
        // Check for existing subscription
        if (prevState.unsubscribe) {
          // Only unsubscribe/update state if subscription variable has changed
          if (prevState.subscriptionParams === nextProps.subscriptionParams) {
            return null;
          }
          prevState.unsubscribe();
        }
        isInited[sId] = true;
        return {
          // Subscribe
          unsubscribe: nextProps[queryName].subscribeToMore({
            document: SUBSCRIPTION,
            variables: nextProps.subscriptionParams,
            updateQuery: handler,
          }),
          // Store subscriptionParam in state for next update
          subscriptionParams: nextProps.subscriptionParams,
        };
      }

      return null;
    }
    render() {
      return <Component {...this.props} />;
    }
  };

export const prepareSubscription = (SUBSCRIPTION, queryName, sId, handler) =>
  withSubscriptionState({
    SUBSCRIPTION,
    queryName,
    sId,
    handler,
  });
