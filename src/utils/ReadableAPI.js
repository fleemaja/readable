const api = "http://localhost:5001"

const uuidv1 = require('uuid/v1');

// Generate a unique token for storing your bookshelf data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

export const getPost = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => {
      alert(JSON.stringify(data))
    })

export const getPostComments = (postId, sortKey) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data.sort(sortByKey(sortKey)))

export const getAllPosts = (sortKey) =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data.sort(sortByKey(sortKey)))

export const getAllCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

export const editPost = (postId, author, body, title, category) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ author, body, title, category })
  }).then(res => res.json())
    .then(data => data)

export const editComment = (commentId, author, body) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ author, body })
  }).then(res => res.json())
    .then(data => data)

export const addComment = (parentId, body, author) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parentId, body, author,
      timestamp: Date.now(),
      id: uuidv1()
    })
  }).then(res => res.json())
    .then(data => data)

export const addPost = (author, body, title, category) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      author, body, title, category,
      timestamp: Date.now(),
      id: uuidv1()
    })
  }).then(res => res.json())
    .then(data => data)

export const deletePost = (id) =>
  fetch(`${api}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => data)

export const deleteComment = (id) =>
  fetch(`${api}/comments/${id}`, {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(data => data)

export const postVote = (id, option) =>
  fetch(`${api}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)

export const commentVote = (id, option) =>
  fetch(`${api}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option })
  }).then(res => res.json())
    .then(data => data)
