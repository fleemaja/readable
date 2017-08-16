import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditPostForm from './EditPostForm';
import { apiPostVote, apiPostDelete } from '../actions';
import { connect } from 'react-redux';
import { FaCaretUp, FaCaretDown, FaClose } from 'react-icons/lib/fa';
import moment from 'moment';

class Post extends Component {

  state = {
    post: {}
  }

  componentWillMount() {
    const post = this.props.post;
    this.setState({ post });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ post: nextProps.post });
  }

  deletePost() {
    const postId = this.state.post.id;
    this.props.deletePost(postId);
  }

  vote(e) {
    const voteType = e.target.getAttribute('data-vote');
    const postId = this.state.post.id;

    this.props.postVote(postId, voteType);
  }

  render() {
    const post = this.state.post;
    const timeAgo = moment(`${post.timestamp}`, "x").fromNow();
    if (Object.keys(post).length === 0 && post.constructor === Object) {
      return (<div>Loading...</div>)
    } else {
      return (
          <div className="Post">
            <div className="vote-component">
              <FaCaretUp className="voteButton" data-vote="upVote" onClick={this.vote.bind(this)} />
              <strong>{post.voteScore}</strong>
              <FaCaretDown className="voteButton" data-vote="downVote" onClick={this.vote.bind(this)} />
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
              </div>
            </div>
          </div>
        )
    }
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
    postVote: (id, vote) => dispatch(apiPostVote(id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
