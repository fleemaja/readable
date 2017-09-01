import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm';
import { apiPostVote, apiPostDelete,
         getPostCommentsNum, updatePostCommentsNumMap } from '../actions';
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';

class Post extends Component {

  componentWillMount = () => {
    const postId = this.props.postId;
    this.props.getPostCommentsNum(postId).then(function(num) {
      this.props.updatePostCommentsNumMap(postId, num)
    }.bind(this));
  }

  deletePost() {
    const postId = this.props.postId;
    this.props.deletePost(postId);
  }

  vote(voteType) {
    const postId = this.props.postId;
    this.props.postVote(postId, voteType);
  }

  render() {
    const postId = this.props.postId;
    // not scalable
    const posts = this.props.posts.filter(p => p.id === postId && p.deleted !== true);
    const post = posts.length > 0 ? posts[0] : {};
    const timeAgo = moment(`${post.timestamp}`, "x").fromNow();
    const numberOfComments = this.props.postCommentsNumMap[postId];
    return (
      <div className={`Post ${this.props.detail ? "detail" : ""}`}>
        <div className="vote-component">
          <FaCaretUp className="voteButton" onClick={this.vote.bind(this, "upVote")} />
          <strong>{post.voteScore}</strong>
          <FaCaretDown className="voteButton" onClick={this.vote.bind(this, "downVote")} />
        </div>
        <div className="post-info">
          <Link to={`/${post.category}/${postId}`} className="title-link">{ post.title }</Link>
          <p>
            { `submitted ${timeAgo} from ${post.author} to ` }
            <Link className="category-link" to={`/${post.category}`}>{ post.category }</Link>
          </p>
          <div className="modify-buttons">
            <FaClose className="delete-button" onClick={this.deletePost.bind(this)} />
            <EditPostForm post={post} />
            <span>{ `${numberOfComments} comments`}</span>
          </div>
        </div>
        { this.props.detail &&
          <div className="post-body">
            { post.body }
          </div>
        }
      </div>
     )
   }
}

function mapStateToProps ({ posts, postCommentsNumMap }) {
  return { posts, postCommentsNumMap }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => dispatch(apiPostDelete(id)),
    postVote: (id, vote) => dispatch(apiPostVote(id, vote)),
    getPostCommentsNum: (id) => dispatch(getPostCommentsNum(id)),
    updatePostCommentsNumMap: (id, numberOfComments) =>
      dispatch(updatePostCommentsNumMap(id, numberOfComments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
