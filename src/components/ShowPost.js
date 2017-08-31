import React, { Component } from 'react';
import Post from './Post';
import Comments from './Comments';
import NavBar from './NavBar';
import AddCommentForm from './AddCommentForm';
import { fetchPostComments, fetchPost, changeCommentSortKey } from '../actions';
import { connect } from 'react-redux';

class ShowPost extends Component {

  componentWillMount = () => {
    const postId = this.props.match.params.postId;
    const sortKey = this.props.commentsSortKey;
    this.props.getPostComments(postId, sortKey);
    this.props.getPost(postId);
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.props.changeCommentSortKey(sortKey);
    this.sortComments(sortKey);
  }

  sortComments(sortKey) {
    const postId = this.props.match.params.postId;
    this.props.getPostComments(postId, sortKey);
  }

  render() {
    const post = this.props.post;
    const comments = this.props.comments;
    const sortKey = this.props.commentsSortKey;
    return (
      <div>
        <NavBar detail={true} />
        <Post post={post} detail={true} />
        <div>
          <AddCommentForm parentId={post.id} />
          <div className="comments-content">
            <h3>Comments</h3>
            {
              <label for="select-comments-sort" className="sort-comments-label">
                <p>Sort By</p>
                <select id="select-comments-sort" value={sortKey} onChange={this.handleSortChange.bind(this)} >
                  <option value="voteScore" selected={sortKey === 'voteScore'} >
                    Most Votes
                  </option>
                  <option value="timestamp" selected={sortKey === 'timestamp'}>
                    Most Recent
                  </option>
                </select>
              </label>
            }
            <Comments comments={comments} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    post: state.post,
    posts: state.posts,
    comments: state.comments,
    commentsSortKey: state.commentsSortKey
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(fetchPost(id)),
    getPostComments: (id, sortKey) => dispatch(fetchPostComments(id, sortKey)),
    changeCommentSortKey: (key) => dispatch(changeCommentSortKey(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
