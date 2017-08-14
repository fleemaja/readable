import React, { Component } from 'react';
import * as ReadableAPI from '../utils/ReadableAPI';
import { Link } from 'react-router-dom';

class Filters extends Component {
  state = {
    categories: [],
    category: '',
    sortKey: 'voteScore'
  }

  componentWillMount = () => {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  componentWillReceiveProps = (newVal) => {
    const category = newVal.match.params.category || '';
    this.setState({ category });
  }

  handleSortChange = (e) => {
    const sortKey = e.target.value;
    this.setState({ sortKey });
    this.props.sortPosts(sortKey);
  }

  render() {
    return (
      <div className="filters">
        <h3>Category</h3>
        <Link to="/">
          <label for="all">
            <input type="radio" name="category" value="" id="all" checked={this.state.category === ''} />
            all
          </label>
        </Link>
        {
          this.state.categories.map((c) => {
            return (
              <Link to={c.name}>
                <label for={c.name}>
                  <input type="radio" name="category" value={c.name} id={c.name} checked={this.state.category === c.name} />
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
      </div>
    )
  }
}

export default Filters;
