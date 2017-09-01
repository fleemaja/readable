import {
  RECEIVE_POSTS,
  ADD_POST,
  EDIT_POST,
  POST_VOTE,
  DELETE_POST
} from '../actions/posts';

export function posts(state = [], action) {
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
