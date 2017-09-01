import {
  TOGGLE_EDIT_POST_MODAL
} from '../actions/editPostModalIsOpen';

export function editPostModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_EDIT_POST_MODAL :
      return !state
    default :
      return state
  }
}
