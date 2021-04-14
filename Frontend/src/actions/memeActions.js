import {
  LOAD_MEME_FEED,
  LOAD_ACTUAL_MEME,
  UNLOAD_ACTUAL_MEME,
} from '../constants/actionTypes';

export function loadMemeFeedAction(payload) {
  return {
    type: LOAD_MEME_FEED,
    payload,
  };
};

export function loadActualMemeAction(payload) {
  return {
    type: LOAD_ACTUAL_MEME,
    payload,
  };
};

export function unloadActualMemeAction() {
  return {
    type: UNLOAD_ACTUAL_MEME,
  };
};