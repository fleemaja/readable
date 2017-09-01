import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { changePostSortKey } from '../actions/postSortKey';
import AddPostForm from './AddPostForm';

class Filters extends Component {

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.props.changePostSortKey(sortKey);
  }

  render() {
    const category = this.props.match.params.category;
    const sortKey = this.props.postSortKey;
    return (
      <div className={`overlay ${this.props.slideClass}`}>
        <div className={`filters ${this.props.slideClass}`}>
          <h3>Category</h3>
          <Link to="/">
            <label for="all">
              <input type="radio" name="category" value="all" id="all" checked={typeof category === 'undefined'} />
              all
            </label>
          </Link>
          {
            this.props.categories.map((c) => {
              return (
                <Link to={`/${c.name}`} key={c.name} >
                  <label for={c.name}>
                    <input type="radio" name="category" value={c.name} id={c.name} checked={category === c.name} />
                    {c.name}
                  </label>
                </Link>
              )
            })
          }
          {
            <label for="select-sort" className="select-sort-label">
              <h3>Sort Type</h3>
              <select value={sortKey} onChange={this.handleSortChange.bind(this)} id="select-sort" >
                <option value="voteScore" selected={sortKey === 'voteScore'} >
                  Most Votes
                </option>
                <option value="timestamp" selected={sortKey === 'timestamp'}>
                  Most Recent
                </option>
              </select>
            </label>
          }
          <AddPostForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ categories, postSortKey }) {
  return { categories, postSortKey }
}

function mapDispatchToProps(dispatch) {
  return {
    changePostSortKey: (key) => dispatch(changePostSortKey(key))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
