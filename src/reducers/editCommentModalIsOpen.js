import {
  TOGGLE_EDIT_COMMENT_MODAL
} from '../actions/editCommentModalIsOpen';

export function editCommentModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_EDIT_COMMENT_MODAL :
      return !state
    default :
      return state
  }
}
