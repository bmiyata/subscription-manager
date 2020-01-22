import AuthActionTypes from './auth.types';
import axios from 'axios';
import { setAlert } from '../alerts/alert.actions';
import SubscriptionActionTypes from '../subscriptions/subscriptions.types';

export const loadUser = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/users/me');
    dispatch({
      type: AuthActionTypes.USER_LOADED,
      payload: res.data
    });

    dispatch({
      type: SubscriptionActionTypes.LOAD_SUBSCRIPTIONS,
      payload: res.data.data.user.subscriptions
    });
  } catch (err) {
    dispatch({
      type: AuthActionTypes.AUTH_ERROR
    });
  }
};

export const signin = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/v1/users/login', body, config);

    dispatch({
      type: AuthActionTypes.LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    dispatch({
      type: AuthActionTypes.LOGIN_FAIL
    });
  }
};

export const signup = (email, password, passwordConfirm) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password, passwordConfirm });
  try {
    const res = await axios.post('/api/v1/users/signup', body, config);
    dispatch({
      type: AuthActionTypes.REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
    dispatch({
      type: AuthActionTypes.REGISTER_FAIL
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/v1/users/logout');
    dispatch({
      type: AuthActionTypes.LOGOUT
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
