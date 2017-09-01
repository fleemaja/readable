export const CHANGE_EDIT_POST_FORM = "CHANGE_EDIT_POST_FORM";

export function changeEditPostForm(post) {
  return {
    type: CHANGE_EDIT_POST_FORM,
    post
  }
};
