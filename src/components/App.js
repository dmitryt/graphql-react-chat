import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import { WelcomePage, ChatPage } from '../containers';

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
