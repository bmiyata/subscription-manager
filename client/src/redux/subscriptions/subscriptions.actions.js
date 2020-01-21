import axios from 'axios';
import SubscriptionActionTypes from './subscriptions.types';
import { setAlert } from '../alerts/alert.actions';

export const addSubscription = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post(
      '/api/v1/users/subscriptions',
      formData,
      config
    );

    dispatch({
      type: SubscriptionActionTypes.ADD_SUBSCRIPTION,
      payload: res.data.data.user.subscriptions
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const deleteSubscription = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/users/subscriptions/${id}`);
    dispatch({
      type: SubscriptionActionTypes.DELETE_SUBSCRIPTION,
      payload: id
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const updateSubscription = (id, formData) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.patch(
      `/api/v1/users/subscriptions/${id}`,
      formData,
      config
    );

    dispatch({
      type: SubscriptionActionTypes.UPDATE_SUBSCRIPTION,
      payload: res.data.data.user.subscriptions
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};

export const paid = subscription => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  // 2020-01-19
  let year = parseInt(subscription.dueDate.slice(0, 4));
  let month = parseInt(subscription.dueDate.slice(5, 7));
  let day = parseInt(subscription.dueDate.slice(8, 10));

  if (subscription.monthly === 'yearly' || subscription.monthly === 'Yearly') {
    year = year + 1;
  }

  const newDate = new Date(year, month, day);

  const updatedSubscription = {
    ...subscription,
    dueDate: newDate
  };

  try {
    const res = await axios.patch(
      `/api/v1/users/subscriptions/${subscription._id}`,
      updatedSubscription,
      config
    );
    dispatch({
      type: SubscriptionActionTypes.UPDATE_SUBSCRIPTION,
      payload: res.data.data.user.subscriptions
    });
  } catch (err) {
    dispatch(setAlert(err.response.data.message, 'error'));
  }
};
