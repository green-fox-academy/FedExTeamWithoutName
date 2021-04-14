import { combineReducers } from 'redux';
import peldaReducer from './peldaReducer';
import peldaReducer2 from './peldaReducer2';
import memeReducer from './memeReducer';

const rootReducer = combineReducers({
  peldaData: peldaReducer,
  peldaData2: peldaReducer2,
  memeData: memeReducer,
});

export default rootReducer;
