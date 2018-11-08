import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';

import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
// import store from './store';
import { API_GQL_HOST } from './config';

import './index.css';

const client = new ApolloClient({
  uri: API_GQL_HOST,
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
