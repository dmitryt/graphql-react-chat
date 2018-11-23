import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { API_GQL_HOST, STORAGE_KEY_TOKEN } from './config';

import './index.css';

const client = new ApolloClient({
  uri: API_GQL_HOST,
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
