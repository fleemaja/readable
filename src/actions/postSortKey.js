export const CHANGE_POST_SORT_KEY = "CHANGE_POST_SORT_KEY";

export function changePostSortKey(key) {
  return {
    type: CHANGE_POST_SORT_KEY,
    key
  }
};
