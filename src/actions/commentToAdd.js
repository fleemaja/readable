export const CHANGE_ADD_COMMENT_FORM = "CHANGE_ADD_COMMENT_FORM";

export function changeAddCommentForm(comment) {
  return {
    type: CHANGE_ADD_COMMENT_FORM,
    comment
  }
};
