export const CHANGE_EDIT_COMMENT_FORM = "CHANGE_EDIT_COMMENT_FORM";

export function changeEditCommentForm(comment) {
  return {
    type: CHANGE_EDIT_COMMENT_FORM,
    comment
  }
};
