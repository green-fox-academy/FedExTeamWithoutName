import {
  STORE_USER_DATA,
  RESET_STORE,
} from '../constants/actionTypes';

export function storeUserDataAction(payload) {
  return {
    type: STORE_USER_DATA,
    payload,
  };
}

export function removeTokenAction() {
  return {
    type: RESET_STORE,
  };
}