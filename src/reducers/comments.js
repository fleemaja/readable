import {
  RECEIVE_POST_COMMENTS,
  ADD_COMMENT,
  EDIT_COMMENT,
  COMMENT_VOTE,
  DELETE_COMMENT
} from '../actions/comments';

export function comments(state = [], action) {
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
