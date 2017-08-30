import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm';
import { apiPostVote, apiPostDelete, fetchPostComments } from '../actions';
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';

class Post extends Component {

  state = {
    post: {},
    numberOfComments: 0
  }

  componentWillMount() {
    const post = this.props.post;
    this.props.getPostComments(post.id, 'voteScore').then(function(comments) {
      const numberOfComments = comments['comments'].length;
      this.setState({ numberOfComments })
    }.bind(this));
    this.setState({ post });
  }

  componentWillReceiveProps(nextProps) {
    const post = nextProps.post;
    this.props.getPostComments(post.id, 'voteScore').then(function(comments) {
      const numberOfComments = comments['comments'].length;
      this.setState({ numberOfComments });
    }.bind(this));
    this.setState({ post });
  }

  deletePost() {
    const postId = this.state.post.id;
    this.props.deletePost(postId);
  }

  vote(voteType) {
    const postId = this.state.post.id;
    this.props.postVote(postId, voteType);
  }

  render() {
    const post = this.state.post;
    const timeAgo = moment(`${post.timestamp}`, "x").fromNow();
    return (
      <div className={`Post ${this.props.detail ? "detail" : ""}`}>
        <div className="vote-component">
          <FaCaretUp className="voteButton" onClick={this.vote.bind(this, "upVote")} />
          <strong>{post.voteScore}</strong>
          <FaCaretDown className="voteButton" onClick={this.vote.bind(this, "downVote")} />
        </div>
        <div className="post-info">
          <Link to={`/${post.category}/${post.id}`} className="title-link">{ post.title }</Link>
          <p>
            { `submitted ${timeAgo} from ${post.author} to ` }
            <Link className="category-link" to={`/${post.category}`}>{ post.category }</Link>
          </p>
          <div className="modify-buttons">
            <FaClose className="delete-button" onClick={this.deletePost.bind(this)} />
            <EditPostForm post={post} />
            <span>{ `${this.state.numberOfComments} comments`}</span>
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

function mapStateToProps (state) {
  return {
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => dispatch(apiPostDelete(id)),
    postVote: (id, vote) => dispatch(apiPostVote(id, vote)),
    getPostComments: (id, sortKey) => dispatch(fetchPostComments(id, sortKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
