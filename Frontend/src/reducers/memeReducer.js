import {
  LOAD_MEME_FEED,
  LOAD_ACTUAL_MEME,
  UNLOAD_ACTUAL_MEME,
} from '../constants/actionTypes';

const initialState = {
  memeFeed: [],
  actualMeme: {
    showMemeDetails: false,
    memeId: null,
    owner: '',
    memeUrl: '',
    reactions: {},
    numOfComments: null,
    comments: [],
  }
};

function memeReducer(state = initialState, action) {
  if (action.type === LOAD_MEME_FEED) {
    return {
      ...state,
      memeFeed: action.payload,
    };
  }
  if (action.type === LOAD_ACTUAL_MEME) {
    return {
      ...state,
      actualMeme: action.payload,
    };
  }
  if (action.type === UNLOAD_ACTUAL_MEME) {
    return {
      ...state,
      actualMeme: initialState.actualMeme,
    };
  }
  return state;
}

export default memeReducer;