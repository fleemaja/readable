import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

export const POST_VOTE = "POST_VOTE";
export const COMMENT_VOTE = "COMMENT_VOTE";

export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const CHANGE_COMMENT_FORM = "CHANGE_COMMENT_FORM";
export const CHANGE_POST_FORM = "CHANGE_POST_FORM";
export const TOGGLE_MODAL = "TOGGLE_MODAL";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export function postVote(id, voteScore) {
  return {
    type: POST_VOTE,
    id,
    voteScore
  }
};

export function commentVote(id, voteScore) {
  return {
    type: COMMENT_VOTE,
    id,
    voteScore
  }
};

export function postDelete(id) {
  return {
    type: DELETE_POST,
    id
  }
};

export function commentDelete(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
};

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
};

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment
  }
};

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
};

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
};

// actions that do not interact with the api
export function changeCommentForm(comment) {
  return {
    type: CHANGE_COMMENT_FORM,
    comment
  }
};

export function changePostForm(post) {
  return {
    type: CHANGE_POST_FORM,
    post
  }
};

export function toggleModal() { return { type: TOGGLE_MODAL } };

// actions that interact with the api
export const apiAddPost = (post) => dispatch => (
  ReadableAPI
      .addPost(post)
      .then(p => dispatch(addPost(p)))
);

export const apiAddComment = (parentId, comment) => dispatch => (
  ReadableAPI
      .addComment(parentId, comment)
      .then(c => dispatch(addComment(c)))
);

export const apiEditPost = (postId, author, body, title, category) => dispatch => (
  ReadableAPI
      .editPost(postId, author, body, title, category)
      .then(post => dispatch(editPost(post)))
);

export const apiEditComment = (commentId, body, author) => dispatch => (
  ReadableAPI
      .editComment(commentId, body, author)
      .then(comment => dispatch(editComment(comment)))
);

export const apiPostVote = (id, vote) => dispatch => (
  ReadableAPI
      .postVote(id, vote)
      .then(post => dispatch(postVote(post.id, post.voteScore)))
);

export const apiCommentVote = (id, vote) => dispatch => (
  ReadableAPI
      .commentVote(id, vote)
      .then(comment => dispatch(commentVote(comment.id, comment.voteScore)))
);

export const apiPostDelete = (id) => dispatch => (
  ReadableAPI.deletePost(id)
             .then(dispatch(postDelete(id)))
);

export const apiCommentDelete = (id) => dispatch => (
  ReadableAPI.deleteComment(id)
             .then(dispatch(commentDelete(id)))
);

export const fetchPostComments = (id, sortKey) => dispatch => (
  ReadableAPI
      .getPostComments(id, sortKey)
      .then(comments => dispatch(receivePostComments(comments)))
);

export const fetchPosts = (sortKey) => dispatch => (
  ReadableAPI
      .getAllPosts(sortKey)
      .then(posts => dispatch(receivePosts(posts)))
);

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);
