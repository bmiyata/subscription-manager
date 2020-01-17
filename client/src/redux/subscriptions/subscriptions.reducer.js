import SubscriptionActionTypes from './subscriptions.types';
import AuthActionTypes from '../auth/auth.types';

const INITIAL_STATE = {
  subscriptions: [],
  loading: true,
  error: {}
};

const subscriptionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SubscriptionActionTypes.ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [...action.payload],
        loading: false
      };
    case SubscriptionActionTypes.UPDATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [...action.payload],
        loading: false
      };
    case SubscriptionActionTypes.DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter(
          subscription => subscription._id !== action.payload
        )
      };
    case SubscriptionActionTypes.LOAD_SUBSCRIPTIONS:
      return {
        ...state,
        subscriptions: [...action.payload],
        loading: false
      };

    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGOUT:
      return {
        ...state,
        subscriptions: []
      };

    default:
      return state;
  }
};

export default subscriptionReducer;
