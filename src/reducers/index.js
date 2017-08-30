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
  DELETE_COMMENT,
  EDIT_POST,
  EDIT_COMMENT,
  CHANGE_ADD_COMMENT_FORM,
  CHANGE_ADD_POST_FORM,
  CHANGE_EDIT_COMMENT_FORM,
  CHANGE_EDIT_POST_FORM,
  TOGGLE_ADD_POST_MODAL,
  TOGGLE_EDIT_POST_MODAL,
  TOGGLE_EDIT_COMMENT_MODAL
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
    case EDIT_POST :
      return state.map(post =>
        (post.id === action.post.id)
          ? {...action.post}
          : post
      )
    case POST_VOTE :
      return state.map(post =>
        (post.id === action.id)
          ? {...post, voteScore: action.voteScore}
          : post
      )
    case DELETE_POST :
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
    case EDIT_COMMENT :
      return state.map(comment =>
        (comment.id === action.comment.id)
          ? {...action.comment}
          : comment
      )
    case COMMENT_VOTE :
      return state.map(comment =>
        (comment.id === action.id)
          ? {...comment, voteScore: action.voteScore}
          : comment
      )
    case DELETE_COMMENT :
      return state.filter(comment => (comment.id !== action.id))
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

function commentToAdd(state = { author: '', body: '' }, action) {
  switch (action.type) {
    case CHANGE_ADD_COMMENT_FORM :
      return {
        ...action.comment
      }
    default :
      return state
  }
}

function commentToEdit(state = { id: '', author: '', body: '' }, action) {
  switch (action.type) {
    case CHANGE_EDIT_COMMENT_FORM :
      return {
        ...action.comment
      }
    default :
      return state
  }
}

const initialPostState = {
  author: '', body: '',
  title: '', category: ''
}

function postToAdd(state = initialPostState, action) {
  switch (action.type) {
    case CHANGE_ADD_POST_FORM :
      return {
        ...action.post
      }
    default :
      return state
  }
}

function postToEdit(state = initialPostState, action) {
  switch (action.type) {
    case CHANGE_EDIT_POST_FORM :
      return {
        ...action.post
      }
    default :
      return state
  }
}

function editCommentModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_EDIT_COMMENT_MODAL :
      return !state
    default :
      return state
  }
}

function addPostModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_ADD_POST_MODAL :
      return !state
    default :
      return state
  }
}

function editPostModalIsOpen(state = false, action) {
  switch (action.type) {
    case TOGGLE_EDIT_POST_MODAL :
      return !state
    default :
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
  commentToAdd,
  commentToEdit,
  postToAdd,
  postToEdit,
  editCommentModalIsOpen,
  addPostModalIsOpen,
  editPostModalIsOpen
})
