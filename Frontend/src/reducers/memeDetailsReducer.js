import {
  SET_SHOW_MEME_DETAILS,
} from '../constants/actionTypes';

const initialState = {
  showMemeDetails: false,
};

function memeDetailsReducer(state = initialState, action) {
  if (action.type === SET_SHOW_MEME_DETAILS) {
    return {
      showMemeDetails: action.payload,
    };
  }
  return state;
}

export default memeDetailsReducer;