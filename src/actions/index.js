import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const RECEIVE_CATEGORIES = "RECEIVE_CATEGORIES";

export const RECEIVE_POST = "RECEIVE_POST";
export const RECEIVE_POST_COMMENTS = "RECEIVE_POST_COMMENTS";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const receivePostComments = comments => ({
  type: RECEIVE_POST_COMMENTS,
  comments
});

export const receiveCategories = categories => ({
  type: RECEIVE_CATEGORIES,
  categories
});

export const fetchPost = (id) => dispatch => (
  ReadableAPI
      .getPost(id)
      .then(post => dispatch(receivePost(post)))
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
