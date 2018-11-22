import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import ChatPage from './ChatPage';
import PrivateRoute from './PrivateRoute';
import { WelcomePage } from '../containers';

export const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/(welcome)?" component={WelcomePage} />
      <PrivateRoute path="/chats/:chatId?" component={ChatPage} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default App;
