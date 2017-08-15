import { combineReducers } from 'redux'

import {
  RECEIVE_POSTS,
  RECEIVE_POST_COMMENTS,
  RECEIVE_CATEGORIES,
  ADD_POST,
  ADD_COMMENT,
  POST_VOTE,
  COMMENT_VOTE,
  DELETE_POST,
  DELETE_COMMENT
} from '../actions'

function posts(state = [], action) {
  switch (action.type) {
    case RECEIVE_POSTS :
      return [
        ...action.posts
      ]
    case ADD_POST :
      return [
        action.post,
        ...state
      ]
    case POST_VOTE :
      return state.map(post =>
        (post.id === action.id)
          ? {...post, voteScore: action.voteScore}
          : post
      )
    case DELETE_POST :
      alert(action.id);
      return state.map(post =>
        (post.id === action.id)
          ? {...post, deleted: true}
          : post
      )
    default :
      return state
  }
}

function comments(state = [], action) {
  switch (action.type) {
    case RECEIVE_POST_COMMENTS :
      return [
        ...action.comments
      ]
    case ADD_COMMENT :
      return [
        action.comment,
        ...state
      ]
    case COMMENT_VOTE :
      return state.map(comment =>
        (comment.id === action.id)
          ? {...comment, voteScore: action.voteScore}
          : comment
      )
    case DELETE_COMMENT :
      return state.map(comment =>
        (comment.id === action.id)
          ? {...comment, deleted: true}
          : comment
      )
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
  comments,
  categories
})
