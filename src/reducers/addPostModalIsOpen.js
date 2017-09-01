import {
  TOGGLE_ADD_POST_MODAL
} from '../actions/addPostModalIsOpen';

export function addPostModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_ADD_POST_MODAL :
      return !state
    default :
      return state
  }
}
