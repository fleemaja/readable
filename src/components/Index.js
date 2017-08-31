import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, setFilterVisibility } from '../actions';
import NavBar from './NavBar';
import Posts from './Posts';
import Filters from './Filters';

class Index extends Component {

  componentWillMount = () => {
    this.props.getCategories();
    this.props.getPosts();
    const width = window.innerWidth;
    if (width < 768) {
      this.props.setFilterVisibility('slide-out');
    }
  }

  toggleFilters() {
    const slideClass = this.props.filtersSlideClass === 'slide-in' ? 'slide-out' : 'slide-in';
    this.props.setFilterVisibility(slideClass);
  }

  render() {
    return (
      <div className="App">
        <NavBar toggleFilters={this.toggleFilters.bind(this)} />
        <Posts {...this.props} />
        <Filters slideClass={this.props.filtersSlideClass} {...this.props} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    postSortKey: state.postSortKey,
    filtersSlideClass: state.filtersSlideClass
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: () => dispatch(fetchPosts()),
    getCategories: () => dispatch(fetchCategories()),
    setFilterVisibility: (visibility) => dispatch(setFilterVisibility(visibility))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
