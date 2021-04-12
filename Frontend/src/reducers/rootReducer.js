import { combineReducers } from 'redux';
import peldaReducer from './peldaReducer';
import peldaReducer2 from './peldaReducer2';

const rootReducer = combineReducers({
  peldaData: peldaReducer,
  peldaData2: peldaReducer2
});

export default rootReducer;
