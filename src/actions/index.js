import * as ReadableAPI from '../utils/ReadableAPI';

// action type constants (constant misspellings are easier to catch as bugs than string misspellings)
export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

export const RECEIVE_POST = "RECEIVE_POST";

export const POST_VOTE = "POST_VOTE";
export const COMMENT_VOTE = "COMMENT_VOTE";

export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const ADD_POST = "ADD_POST";
export const ADD_COMMENT = "ADD_COMMENT";

export const EDIT_POST = "EDIT_POST";
export const EDIT_COMMENT = "EDIT_COMMENT";

export const CHANGE_ADD_COMMENT_FORM = "CHANGE_ADD_COMMENT_FORM";
export const CHANGE_EDIT_COMMENT_FORM = "CHANGE_EDIT_COMMENT_FORM";
export const CHANGE_ADD_POST_FORM = "CHANGE_ADD_POST_FORM";
export const CHANGE_EDIT_POST_FORM = "CHANGE_EDIT_POST_FORM";

export const TOGGLE_EDIT_COMMENT_MODAL = "TOGGLE_EDIT_COMMENT_MODAL";
export const TOGGLE_EDIT_POST_MODAL = "TOGGLE_EDIT_POST_MODAL";
export const TOGGLE_ADD_POST_MODAL = "TOGGLE_ADD_POST_MODAL";

export const CHANGE_POST_SORT_KEY = "CHANGE_POST_SORT_KEY";
export const CHANGE_COMMENT_SORT_KEY = "CHANGE_COMMENT_SORT_KEY";

export const SET_FILTER_VISIBILITY = "SET_FILTER_VISIBILITY";

export const UPDATE_POST_COMMENTS_NUM_MAP = "UPDATE_POST_COMMENTS_NUM_MAP";

// actions
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

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
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

export function changeAddCommentForm(comment) {
  return {
    type: CHANGE_ADD_COMMENT_FORM,
    comment
  }
};

export function changeAddPostForm(post) {
  return {
    type: CHANGE_ADD_POST_FORM,
    post
  }
};

export function changeEditCommentForm(comment) {
  return {
    type: CHANGE_EDIT_COMMENT_FORM,
    comment
  }
};

export function changeEditPostForm(post) {
  return {
    type: CHANGE_EDIT_POST_FORM,
    post
  }
};

export function toggleAddPostModal() { return { type: TOGGLE_ADD_POST_MODAL } };
export function toggleEditPostModal() { return { type: TOGGLE_EDIT_POST_MODAL } };
export function toggleEditCommentModal() { return { type: TOGGLE_EDIT_COMMENT_MODAL } };

export function changePostSortKey(key) {
  return {
    type: CHANGE_POST_SORT_KEY,
    key
  }
}

export function changeCommentSortKey(key) {
  return {
    type: CHANGE_COMMENT_SORT_KEY,
    key
  }
}

export function setFilterVisibility(visibility) {
  return {
    type: SET_FILTER_VISIBILITY,
    visibility
  }
}

export function updatePostCommentsNumMap(postId, numberOfComments) {
  return {
    type: UPDATE_POST_COMMENTS_NUM_MAP,
    postId,
    numberOfComments
  }
}

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

export const apiEditPost = (post) => dispatch => (
  ReadableAPI
      .editPost(post)
      .then(post => dispatch(editPost(post)))
);

export const apiEditComment = (commentId, comment) => dispatch => (
  ReadableAPI
      .editComment(commentId, comment)
      .then(c => dispatch(editComment(c)))
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

export const fetchPostComments = (id) => dispatch => (
  ReadableAPI
      .getPostComments(id)
      .then(comments => dispatch(receivePostComments(comments)))
);

export const getPostCommentsNum = (id) => dispatch => (
  ReadableAPI
      .getPostCommentsNum(id)
      .then(num => num)
);

export const fetchPosts = () => dispatch => (
  ReadableAPI
      .getAllPosts()
      .then(posts => dispatch(receivePosts(posts)))
);

export const fetchCategories = () => dispatch => (
  ReadableAPI
      .getAllCategories()
      .then(categories => dispatch(receiveCategories(categories)))
);

export const fetchPost = (id) => dispatch => (
  ReadableAPI
      .getPost(id)
      .then(post => dispatch(receivePost(post)))
);
