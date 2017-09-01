import {
  CHANGE_POST_SORT_KEY
} from '../actions/postSortKey';

export function postSortKey(state = 'voteScore', action) {
  switch (action.type) {
    case CHANGE_POST_SORT_KEY :
      return action.key
    default :
      return state
  }
}
