import React from 'react';
import { compose } from 'recompose';
import { Route, Redirect } from 'react-router-dom';

import { withCurrentUser } from '../store/user';
import withLoader from '../hocs/withLoader';

const isAuthenticated = ({ data }) => !!data;

const PrivateRoute = ({ path, component, currentUser }) =>
  (isAuthenticated(currentUser) ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  ));

export default compose(
  withCurrentUser,
  withLoader(({ currentUser: { loading } }) => loading),
)(PrivateRoute);
