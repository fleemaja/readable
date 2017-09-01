import {
  CHANGE_EDIT_COMMENT_FORM
} from '../actions/commentToEdit';

export function commentToEdit(state = { id: '', author: '', body: '' }, action) {
  switch (action.type) {
    case CHANGE_EDIT_COMMENT_FORM :
      return {
        ...action.comment
      }
    default :
      return state
  }
}
