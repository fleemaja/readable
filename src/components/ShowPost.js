import React, { Component } from 'react';
import Post from './Post';
import Comments from './Comments';
import NavBar from './NavBar';
import AddCommentForm from './AddCommentForm';
import { fetchPostComments, changeCommentSortKey } from '../actions';
import { connect } from 'react-redux';

class ShowPost extends Component {

  componentWillMount = () => {
    const postId = this.props.match.params.postId;
    this.props.getPostComments(postId);
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.props.changeCommentSortKey(sortKey);
  }

  render() {
    const postId = this.props.match.params.postId;
    const comments = this.props.comments;
    const sortKey = this.props.commentsSortKey;
    const possiblePosts = this.props.posts.filter(p => p.id === postId && p.deleted !== true);
    if (possiblePosts.length > 0) {
      return (
        <div>
          <NavBar detail={true} />
          <Post postId={postId} detail={true} />
          <div>
            <AddCommentForm parentId={postId} />
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
    } else {
      return (
        <div>
          <NavBar detail={true} />
          <div className="page-not-found">No Post Found</div>
        </div>
      )
    }
  }
}

function mapStateToProps ({ posts, comments, commentsSortKey }) {
  return { posts, comments, commentsSortKey }
}

function mapDispatchToProps(dispatch) {
  return {
    getPostComments: (id) => dispatch(fetchPostComments(id)),
    changeCommentSortKey: (key) => dispatch(changeCommentSortKey(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowPost);
