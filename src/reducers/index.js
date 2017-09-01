import { combineReducers } from 'redux';

import { posts } from './posts';
import { comments } from './comments';
import { categories } from './categories';
import { post } from './post';
import { postSortKey } from './postSortKey';
import { commentSortKey } from './commentSortKey';
import { commentToAdd } from './commentToAdd';
import { commentToEdit } from './commentToEdit';
import { postToAdd } from './postToAdd';
import { postToEdit } from './postToEdit';
import { editCommentModalIsOpen } from './editCommentModalIsOpen';
import { addPostModalIsOpen } from './addPostModalIsOpen';
import { editPostModalIsOpen } from './editPostModalIsOpen';
import { filtersSlideClass } from './filtersSlideClass';
import { postCommentsNumMap } from './postCommentsNumMap';

export default combineReducers({
  posts,
  comments,
  categories,
  post,
  postSortKey,
  commentSortKey,
  commentToAdd,
  commentToEdit,
  postToAdd,
  postToEdit,
  editCommentModalIsOpen,
  addPostModalIsOpen,
  editPostModalIsOpen,
  filtersSlideClass,
  postCommentsNumMap
})
