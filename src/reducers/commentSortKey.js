import {
  CHANGE_COMMENT_SORT_KEY
} from '../actions/commentSortKey';

export function commentSortKey(state = 'voteScore', action) {
  switch (action.type) {
    case CHANGE_COMMENT_SORT_KEY :
      return action.key
    default :
      return state
  }
}
