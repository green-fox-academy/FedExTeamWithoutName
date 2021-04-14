import {
  SET_SHOW_MEME_DETAILS,
} from '../constants/actionTypes';

function setShowMemeDetailsAction(payload) {
  return {
    type: SET_SHOW_MEME_DETAILS,
    payload,
  };
};

export default setShowMemeDetailsAction;