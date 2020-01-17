import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';

import HomePage from '../pages/homepage.component';
import SignInPage from '../pages/signinpage.component';
import SignUpPage from '../pages/signuppage.component';
import PrivateRoute from './PrivateRoute';
import Alert from '../components/alert.component';

const Routes = ({ auth }) => {
  return (
    <Fragment>
      <Alert />
      <Switch>
        <Route
          exact
          path="/signin"
          render={() =>
            auth.isAuthenticated ? <Redirect to="/" /> : <SignInPage />
          }
        />
        <Route
          exact
          path="/signup"
          render={() =>
            auth.isAuthenticated ? <Redirect to="/" /> : <SignUpPage />
          }
        />
        <PrivateRoute exact path="/" component={HomePage} />
      </Switch>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Routes);
