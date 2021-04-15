import {
  LOAD_MEME_FEED,
  LOAD_MEME_FEED_ERROR,
  LOAD_MY_MEME,
  LOAD_MY_MEME_ERROR,
  LOAD_ACTUAL_MEME,
  LOAD_ACTUAL_MEME_ERROR,
  UNLOAD_ACTUAL_MEME,
  LOAD_POSTED_COMMENT,
  LOAD_POSTED_REACTION,
  SET_ISPUBLIC_ON_MEME,
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
  if (action.type === LOAD_POSTED_COMMENT) {
    return {
      ...state,
      memeFeed: state.memeFeed.forEach(meme => {
        if (meme.memeId === action.payload.memeId) {
          meme.numberOfComments += 1;
        }
      }),
      actualMeme: {
        ...state.actualMeme,
        comments: [
          ...state.actualMeme.comments,
          action.payload.comment,
        ],
      },
    };
  }
  if (action.type === LOAD_POSTED_REACTION) {
    return {
      ...state,
      memeFeed: state.memeFeed.forEach(meme => {
        if (meme.memeId === action.payload.memeId) {
          meme.reactions.forEach(reaction => {
            if (reaction.reactionId === action.payload.reactionId) {
              reaction.reactionCount += 1;
            }
          })
        }
      }),
      actualMeme: {
        ...state.actualMeme,
        reactions: state.actualMeme.reactions.forEach(reaction => {
          if (reaction.reactionId === action.payload.reactionId) {
            reaction.reactionCount += 1;
          }
        })
      },
    };
  }
  if (action.type === SET_ISPUBLIC_ON_MEME) {
    return {
      ...state,
      myMeme: state.myMeme.forEach(meme => {
        if (meme.memeId === action.payload) {
          meme.isPublic = !meme.isPublic;
        }
      }),
    };
  }
  return state;
}

export default memeReducer;