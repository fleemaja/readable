import {
  CHANGE_ADD_COMMENT_FORM
} from '../actions/commentToAdd';

export function commentToAdd(state = { author: '', body: '' }, action) {
  switch (action.type) {
    case CHANGE_ADD_COMMENT_FORM :
      return {
        ...action.comment
      }
    default :
      return state
  }
}
