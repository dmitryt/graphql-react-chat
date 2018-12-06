import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-client';
import { ApolloLink, split } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { withClientState } from 'apollo-link-state';
import { setContext } from 'apollo-link-context';
import { getMainDefinition } from 'apollo-utilities';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { API_GQL_HOST, API_WS_GQL_HOST, STORAGE_KEY_TOKEN } from './config';
import clientState from './store/local';

import './index.css';

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  ...clientState,
});

const httpLink = new HttpLink({
  uri: API_GQL_HOST,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(STORAGE_KEY_TOKEN);
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const wsLink = new WebSocketLink({
  uri: API_WS_GQL_HOST,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(STORAGE_KEY_TOKEN),
    },
  },
});

const remoteLink = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  authLink.concat(httpLink),
);

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, remoteLink]),
  cache,
  request: async (operation) => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const headers = {
      Authorization: token ? `Bearer ${token}` : '',
    };
    operation.setContext({ headers });
  },
});

const rootEl = document.getElementById('root');
const render = (Component) => {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Component />
    </ApolloProvider>,
    rootEl,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}

registerServiceWorker();
