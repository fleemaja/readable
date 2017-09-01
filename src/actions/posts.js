import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POSTS = "RECEIVE_POSTS";
export const POST_VOTE = "POST_VOTE";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";
export const EDIT_POST = "EDIT_POST";

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts
});

export function postVote(id, voteScore) {
  return {
    type: POST_VOTE,
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

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
};

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
};

export const fetchPosts = () => dispatch => (
  ReadableAPI
      .getAllPosts()
      .then(posts => dispatch(receivePosts(posts)))
);

export const apiPostVote = (id, vote) => dispatch => (
  ReadableAPI
      .postVote(id, vote)
      .then(post => dispatch(postVote(post.id, post.voteScore)))
);

export const apiPostDelete = (id) => dispatch => (
  ReadableAPI.deletePost(id)
             .then(dispatch(postDelete(id)))
);

export const apiAddPost = (post) => dispatch => (
  ReadableAPI
      .addPost(post)
      .then(p => dispatch(addPost(p)))
);

export const apiEditPost = (post) => dispatch => (
  ReadableAPI
      .editPost(post)
      .then(post => dispatch(editPost(post)))
);
