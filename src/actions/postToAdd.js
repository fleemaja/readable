export const CHANGE_ADD_POST_FORM = "CHANGE_ADD_POST_FORM";

export function changeAddPostForm(post) {
  return {
    type: CHANGE_ADD_POST_FORM,
    post
  }
};
