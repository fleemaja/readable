import {
  CHANGE_EDIT_POST_FORM
} from '../actions/postToEdit';

const initialPostState = {
  author: '', body: '',
  title: '', category: ''
}

export function postToEdit(state = initialPostState, action) {
  switch (action.type) {
    case CHANGE_EDIT_POST_FORM :
      return {
        ...action.post
      }
    default :
      return state
  }
}
