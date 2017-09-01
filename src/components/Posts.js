import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';

class Posts extends Component {
  render() {
    const category = this.props.match.params.category || '';
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    return (
      <div className="Posts">
        {
          this.props.posts
            .filter(p => p.deleted !== true &&
                   (category === '' ||  p.category === category))
            .sort(sortByKey(this.props.postSortKey))
            .map((p) =>
              <Post key={p.timestamp}
                    postId={p.id} />
          )
        }
      </div>
    )
  }
}

function mapStateToProps ({ posts, postSortKey }) {
  return { posts, postSortKey }
}

export default connect(
  mapStateToProps
)(Posts);
