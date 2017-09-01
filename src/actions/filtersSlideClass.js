export const SET_FILTER_VISIBILITY = "SET_FILTER_VISIBILITY";

export function setFilterVisibility(visibility) {
  return {
    type: SET_FILTER_VISIBILITY,
    visibility
  }
};
