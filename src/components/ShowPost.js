import React, { Component } from 'react';
import Post from './Post';
import Comments from './Comments';
import NavBar from './NavBar';
import AddCommentForm from './AddCommentForm';
import { fetchPosts, fetchPostComments } from '../actions';
import { connect } from 'react-redux';

class ShowPost extends Component {
  state = {
    post: {},
    comments: [],
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
    const postId = this.props.match.params.postId;
    const sortKey = this.state.sortKey;
    this.props.getPostComments(postId, sortKey);
  }

  componentWillReceiveProps = (newVal) => {
    const postId = this.props.match.params.postId;
    const comments = newVal.comments;
    const posts = this.props.posts;
    let post = {}
    posts.forEach(p => {
      if (p.id === postId) {
        post = p;
      }
    });
    this.setState({ comments, post });
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.setState({ sortKey });
    this.sortComments(sortKey);
  }

  sortComments(sortKey) {
    const postId = this.props.match.params.postId;
    this.props.getPostComments(postId, sortKey);
  }

  render() {
    const post = this.state.post;
    const comments = this.state.comments
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
                <select id="select-comments-sort" value={this.state.sortKey} onChange={this.handleSortChange.bind(this)} >
                  <option value="voteScore" selected={this.state.sortKey === 'voteScore'} >
                    Most Votes
                  </option>
                  <option value="timestamp" selected={this.state.sortKey === 'timestamp'}>
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
    posts: state.posts,
    comments: state.comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostComments: (id, sortKey) => dispatch(fetchPostComments(id, sortKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
