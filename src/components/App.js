import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
// import { ConnectedRouter } from 'react-router-redux';

// import { history } from '../store';

import ChatPage from './ChatPage';
import { WelcomePage } from '../containers';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/(welcome)?" component={WelcomePage} />
      <Route path="/chats/:chatId?" component={ChatPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
