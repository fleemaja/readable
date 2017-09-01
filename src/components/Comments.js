import React, { Component } from 'react';
import Comment from './Comment';
import { connect } from 'react-redux';

class Comments extends Component {

  render() {
    const sortByKey = (sortKey) => (a, b) => a[sortKey] < b[sortKey];
    return (
      <div className="Comments">
        {
          this.props.comments
            .sort(sortByKey(this.props.commentSortKey))
            .map((c) =>
              <Comment key={c.timestamp}
                     comment={c} />
          )
        }
      </div>
    )
  }
}

function mapStateToProps ({ commentSortKey }) {
  return { commentSortKey }
}

export default connect(
  mapStateToProps
)(Comments);
