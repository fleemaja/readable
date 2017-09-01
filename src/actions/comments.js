import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const COMMENT_VOTE = "COMMENT_VOTE";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export function commentDelete(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
};

export function commentVote(id, voteScore) {
  return {
    type: COMMENT_VOTE,
    id,
    voteScore
  }
};


export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
};

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
};


export const fetchPostComments = (id) => dispatch => (
  ReadableAPI
      .getPostComments(id)
      .then(comments => dispatch(receivePostComments(comments)))
);

export const apiCommentDelete = (id) => dispatch => (
  ReadableAPI.deleteComment(id)
             .then(dispatch(commentDelete(id)))
);

export const apiCommentVote = (id, vote) => dispatch => (
  ReadableAPI
      .commentVote(id, vote)
      .then(comment => dispatch(commentVote(comment.id, comment.voteScore)))
);

export const apiAddComment = (parentId, comment) => dispatch => (
  ReadableAPI
      .addComment(parentId, comment)
      .then(c => dispatch(addComment(c)))
);

export const apiEditComment = (commentId, comment) => dispatch => (
  ReadableAPI
      .editComment(commentId, comment)
      .then(c => dispatch(editComment(c)))
);
