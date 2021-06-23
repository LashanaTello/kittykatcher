import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';

const appReducer = combineReducers({
  auth: authReducer,
  errors: errorReducer,
  posts: postReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export default rootReducer;
