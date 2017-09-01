import * as ReadableAPI from '../utils/ReadableAPI';

export const RECEIVE_POST = "RECEIVE_POST";

export const receivePost = post => ({
  type: RECEIVE_POST,
  post
});

export const fetchPost = (id) => dispatch => (
  ReadableAPI
      .getPost(id)
      .then(post => dispatch(receivePost(post)))
);
