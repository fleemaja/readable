import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';

class Posts extends Component {
  render() {
    const category = this.props.match.params.category || '';
    return (
      <div className="Posts">
        {
          this.props.posts
            .filter(p => category === '' || p.category === category)
            .map((p) =>
              <Post key={p.timestamp}
                 post={p} />
          )
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

export default connect(
  mapStateToProps
)(Posts);
