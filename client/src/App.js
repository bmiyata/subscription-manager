import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { loadUser } from './redux/auth/auth.actions';
import { store } from './redux/store';

import Routes from './routing/Routes';

import './App.css';

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return <Route component={Routes} />;
};

export default App;
