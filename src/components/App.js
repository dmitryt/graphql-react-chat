import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import NotificationProvider from '../context/notificationContext';

import { WelcomePage, ChatPage, PrivateRoute } from '../containers';

const App = () => (
  <NotificationProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/(welcome)?" component={WelcomePage} />
        <PrivateRoute path="/chats/:chatId?" component={ChatPage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  </NotificationProvider>
);

export default App;
