import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import alertReducer from './alerts/alert.reducer';
import subscriptionReducer from './subscriptions/subscriptions.reducer';
import authReducer from './auth/auth.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth']
};

const rootReducer = combineReducers({
  alert: alertReducer,
  subscriptions: subscriptionReducer,
  auth: authReducer
});

export default persistReducer(persistConfig, rootReducer);
