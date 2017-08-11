import React, { Component } from 'react';
import Post from './Post';
import AddPostForm from './AddPostForm';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    category: ''
  }

  updatePosts(deletedId) {
    const posts = this.state.posts.filter(c => c.id != deletedId);
    this.setState({ posts });
  }

  componentWillMount() {
    this.setState({ posts: this.props.posts });
  }

  componentWillReceiveProps(newVal) {
    const category = newVal.match.params.category || '';
    let posts = newVal.posts;
    this.setState({ category });
    if (category) {
      posts = posts.filter(p => p.category === category)
    }
    this.setState({ posts });
  }
  render() {
    return (
      <div className="Posts">
        <AddPostForm addPost={this.props.addPost.bind(this)} />
        {
          this.state.posts.map((p) =>
            <Post key={p.timestamp}
                  updatePosts={this.updatePosts.bind(this)}
                  post={p} />
          )
        }
      </div>
    )
  }
}

export default Posts;
