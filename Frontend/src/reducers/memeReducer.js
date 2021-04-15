import {
  LOAD_MEME_FEED,
  LOAD_MEME_FEED_ERROR,
  LOAD_MY_MEME,
  LOAD_MY_MEME_ERROR,
  LOAD_ACTUAL_MEME,
  LOAD_ACTUAL_MEME_ERROR,
  UNLOAD_ACTUAL_MEME,
} from '../constants/actionTypes';

const initialState = {
  memeFeed: [],
  loadMemeFeedStatus: 'loading',
  loadMemeFeedErrorMessage: '',
  myMeme: [],
  loadMyMemeStatus: 'loading',
  loadMyMemeErrorMessage: '',
  actualMeme: {
    showMemeDetails: false,
    memeId: null,
    owner: '',
    memeUrl: '',
    reactions: {},
    numOfComments: null,
    comments: [],
  },
  loadCommentsStatus: 'loading',
  loadCommentsErrorMessage: '',
};

function memeReducer(state = initialState, action) {
  if (action.type === LOAD_MEME_FEED) {
    return {
      ...state,
      memeFeed: action.payload,
      loadMemeFeedStatus: 'ready',
      loadMemeFeedErrorMessage: '',
    };
  }
  if (action.type === LOAD_MEME_FEED_ERROR) {
    return {
      ...state,
      loadMemeFeedStatus: 'error',
      loadMemeFeedErrorMessage: action.payload,
    };
  }
  if (action.type === LOAD_MY_MEME) {
    return {
      ...state,
      myMeme: action.payload,
      loadMyMemeStatus: 'ready',
      loadMyMemeErrorMessage: '',
    };
  }
  if (action.type === LOAD_MY_MEME_ERROR) {
    return {
      ...state,
      loadMyMemeStatus: 'error',
      loadMyMemeErrorMessage: action.payload,
    };
  }
  if (action.type === LOAD_ACTUAL_MEME) {
    return {
      ...state,
      actualMeme: action.payload,
      loadCommentsStatus: 'ready',
      loadCommentsErrorMessage: '',
    };
  }
  if (action.type === LOAD_ACTUAL_MEME_ERROR) {
    return {
      ...state,
      loadCommentsStatus: 'error',
      loadCommentsErrorMessage: action.payload,
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