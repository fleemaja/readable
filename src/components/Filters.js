import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { fetchCategories } from '../actions';
import { connect } from 'react-redux';
import AddPostForm from './AddPostForm';

class Filters extends Component {
  state = {
    categories: [],
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
    this.props.getCategories();
  }

  componentWillReceiveProps = (newVal) => {
    const categories = newVal.categories;
    this.setState({ categories });
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.setState({ sortKey });
    this.props.sortPosts(sortKey);
  }

  render() {
    const category = this.props.match.params.category;
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
            this.state.categories.map((c) => {
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
            <select value={this.state.sortKey} onChange={this.handleSortChange.bind(this)} >
              <option value="voteScore" selected={this.state.sortKey === 'voteScore'} >
                Most Votes
              </option>
              <option value="timestamp" selected={this.state.sortKey === 'timestamp'}>
                Most Recent
              </option>
            </select>
          }
          <AddPostForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getCategories: () => dispatch(fetchCategories())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filters);
