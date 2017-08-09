import React, { Component } from 'react';
import * as ReadableAPI from './ReadableAPI';
import './Filters.css';

class Filters extends Component {
  state = {
    categories: []
  }

  componentWillMount = () => {
    ReadableAPI.getAllCategories().then((categories) => this.setState({categories}))
  }

  render() {
    return (
      <div className="filters">
        <h3>Categories</h3>
        {
          this.state.categories.map((c) => <p>{c.name}</p>)
        }
      </div>
    )
  }
}

export default Filters;
