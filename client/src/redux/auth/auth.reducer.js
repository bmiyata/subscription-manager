import AuthActionTypes from './auth.types';

const INITIAL_STATE = {
  isAuthenticated: null,
  loading: true,
  user: null
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActionTypes.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload
      };
    case AuthActionTypes.REGISTER_SUCCESS:
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        loading: false
      };

    case AuthActionTypes.AUTH_ERROR:
    case AuthActionTypes.LOGOUT:
    case AuthActionTypes.LOGIN_FAIL:
    case AuthActionTypes.REGISTER_FAIL:
      return {
        isAuthenticated: false,
        loading: false,
        user: null
      };

    default:
      return state;
  }
};

export default AuthReducer;
