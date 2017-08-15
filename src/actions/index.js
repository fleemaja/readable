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

export const apiAddPost = (author, body, title, category) => dispatch => (
  ReadableAPI
      .addPost(author, body, title, category)
      .then(post => dispatch(addPost(post)))
);

export const apiAddComment = (parentId, body, author) => dispatch => (
  ReadableAPI
      .addComment(parentId, body, author)
      .then(comment => dispatch(addComment(comment)))
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
