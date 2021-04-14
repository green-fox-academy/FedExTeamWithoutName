import {
    HEADER_VISIBILITY,
  } from '../constants/actionTypes';
  
  function headerVisibilityAction(payload) {
    return {
      type: HEADER_VISIBILITY,
      payload,
    };
  };
  
  export default headerVisibilityAction;