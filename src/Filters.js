import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI';
import { Link } from 'react-router-dom';
import './Filters.css';

class Filters extends Component {
  state = {
    categories: [],
    category: ''
  }

  componentWillMount = () => {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  componentWillReceiveProps = (newVal) => {
    const category = newVal.match.params.category || '';
    this.setState({ category });
  }

  render() {
    return (
      <div className="filters">
        <h3>Category</h3>
        <Link to="/">
          <label for="all">
            <input type="radio" name="category" value="" id="all" checked={this.state.category == ''} />
            all
          </label>
        </Link>
        {
          this.state.categories.map((c) => {
            return (
              <Link to={c.name}>
                <label for={c.name}>
                  <input type="radio" name="category" value={c.name} id={c.name} checked={this.state.category == c.name} />
                  {c.name}
                </label>
              </Link>
            )
          })
        }
      </div>
    )
  }
}

export default Filters;
