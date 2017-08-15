import { combineReducers } from 'redux'

import {
  RECEIVE_POSTS,
  RECEIVE_CATEGORIES
} from '../actions'

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return [
        ...action.posts
      ]
    default :
      return state
  }
}

function categories(state = [], action) {
  switch (action.type) {
    case RECEIVE_CATEGORIES :
      return [
        ...action.categories
      ]
    default :
      return state
  }
}

export default combineReducers({
  posts,
  categories
})
