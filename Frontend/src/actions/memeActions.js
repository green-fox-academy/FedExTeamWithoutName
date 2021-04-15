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

export function loadMemeFeedAction(payload) {
  return {
    type: LOAD_MEME_FEED,
    payload,
  };
};

export function errorOnLoadMemeFeedAction(payload) {
  return {
    type: LOAD_MEME_FEED_ERROR,
    payload,
  };
}

export function loadMyMemeAction(payload) {
  return {
    type: LOAD_MY_MEME,
    payload,
  };
};

export function errorOnLoadMyMemeAction(payload) {
  return {
    type: LOAD_MY_MEME_ERROR,
    payload,
  };
}

export function loadActualMemeAction(payload) {
  return {
    type: LOAD_ACTUAL_MEME,
    payload,
  };
};

export function errorOnloadActualMemeAction(payload) {
  return {
    type: LOAD_ACTUAL_MEME_ERROR,
    payload,
  };
};

export function unloadActualMemeAction() {
  return {
    type: UNLOAD_ACTUAL_MEME,
  };
};

export function loadPostedCommentAction(payload) {
  return {
    type: LOAD_POSTED_COMMENT,
    payload
  };
};

export function loadPostedReactionAction(payload) {
  return {
    type: LOAD_POSTED_REACTION,
    payload
  };
};

export function setIsPublicOnMemeAction(payload) {
  return {
    type: SET_ISPUBLIC_ON_MEME,
    payload
  };
};
