import { combineReducers } from 'redux';
import peldaReducer from './peldaReducer';
import peldaReducer2 from './peldaReducer2';
import memeDetailsReducer from './memeDetailsReducer';

const rootReducer = combineReducers({
  peldaData: peldaReducer,
  peldaData2: peldaReducer2,
  memeDetails: memeDetailsReducer,
});

export default rootReducer;
