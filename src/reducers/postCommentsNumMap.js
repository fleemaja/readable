import {
  UPDATE_POST_COMMENTS_NUM_MAP
} from '../actions/postCommentsNumMap';

export function postCommentsNumMap(state = {}, action) {
  switch (action.type) {
    case UPDATE_POST_COMMENTS_NUM_MAP :
      return {
        ...state,
        [action.postId]: action.numberOfComments
      }
    default :
      return state
  }
}
