export const CHANGE_COMMENT_SORT_KEY = "CHANGE_COMMENT_SORT_KEY";

export function changeCommentSortKey(key) {
  return {
    type: CHANGE_COMMENT_SORT_KEY,
    key
  }
};
