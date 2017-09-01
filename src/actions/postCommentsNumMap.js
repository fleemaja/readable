import * as ReadableAPI from '../utils/ReadableAPI';

export const UPDATE_POST_COMMENTS_NUM_MAP = "UPDATE_POST_COMMENTS_NUM_MAP";

export function updatePostCommentsNumMap(postId, numberOfComments) {
  return {
    type: UPDATE_POST_COMMENTS_NUM_MAP,
    postId,
    numberOfComments
  }
};

export const getPostCommentsNum = (id) => dispatch => (
  ReadableAPI
      .getPostCommentsNum(id)
      .then(num => num)
);
