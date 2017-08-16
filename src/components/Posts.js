import React, { Component } from 'react';
import Post from './Post';

class Posts extends Component {
  state = {
    posts: [],
    category: ''
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
        {
          this.state.posts.map((p) =>
            <Post key={p.timestamp}
                  post={p} />
          )
        }
      </div>
    )
  }
}

export default Posts;
