import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchPosts, fetchCategories, setFilterVisibility } from '../actions';
import NavBar from './NavBar';
import Posts from './Posts';
import ShowPost from './ShowPost';
import Filters from './Filters';
import { BrowserRouter, Switch } from 'react-router-dom';

class App extends Component {

  sortPosts(sortKey) {
    this.props.getPosts(sortKey);
  }

  componentWillMount = () => {
    this.props.getCategories();
    this.props.getPosts(this.props.sortKey);
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
      <BrowserRouter>
        <Switch>
          <Route exact path="/:category?" render={(props) => (
                <div className="App">
                  <NavBar toggleFilters={this.toggleFilters.bind(this)} />
                  <Posts {...props} />
                  <Filters slideClass={this.props.filtersSlideClass}
                           sortPosts={this.sortPosts.bind(this)}
                           {...props} />
                </div>
              )}
            />

          <Route exact path="/:category/:postId" component={ShowPost} />
        </Switch>
      </BrowserRouter>
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
    getPosts: (sortKey) => dispatch(fetchPosts(sortKey)),
    getCategories: () => dispatch(fetchCategories()),
    setFilterVisibility: (visibility) => dispatch(setFilterVisibility(visibility))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
