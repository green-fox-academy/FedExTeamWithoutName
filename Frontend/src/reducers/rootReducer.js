import { combineReducers } from 'redux';
import memeReducer from './memeReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  userData: userReducer,
  memeData: memeReducer,
});

export default rootReducer;
