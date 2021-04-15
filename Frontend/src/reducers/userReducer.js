import {
  STORE_USER_DATA,
  RESET_STORE,
} from '../constants/actionTypes';

const initialState = {
  accessToken: '',
  id: null,
  userName: '',
};

function userReducer(state = initialState, action) {
  if (action.type === STORE_USER_DATA) {
    return {
      ...state,
      accessToken: action.payload.accessToken,
      id: action.payload.id,
      userName: action.payload.userName,
    };
  }
  if (action.type === RESET_STORE) {
    return initialState;
  }
  return state;
}

export default userReducer;