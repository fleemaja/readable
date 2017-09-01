import {
  CHANGE_ADD_POST_FORM
} from '../actions/postToAdd';

const initialPostState = {
  author: '', body: '',
  title: '', category: ''
}

export function postToAdd(state = initialPostState, action) {
  switch (action.type) {
    case CHANGE_ADD_POST_FORM :
      return {
        ...action.post
      }
    default :
      return state
  }
}
