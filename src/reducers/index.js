import { combineReducers } from 'redux'

import {
  RECEIVE_POSTS
} from '../actions'

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :

      return [
        ...state,
        ...action.posts
      ]
    default :
      return state
  }
}

export default combineReducers({
  posts
})
