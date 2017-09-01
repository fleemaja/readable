import {
  SET_FILTER_VISIBILITY
} from '../actions/filtersSlideClass';

export function filtersSlideClass(state = 'slide-in', action) {
  switch (action.type) {
    case SET_FILTER_VISIBILITY :
      return action.visibility
    default :
      return state
  }
}
