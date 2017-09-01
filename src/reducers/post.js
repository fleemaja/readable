import {
  RECEIVE_POST
} from '../actions/post';

export function post(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST :
      return {
        ...action.post
      }
    default :
      return state
  }
}
