import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import NavBar from './NavBar';
import Posts from './Posts';
import ShowPost from './ShowPost';
import Filters from './Filters';
import { BrowserRouter, Switch } from 'react-router-dom';

class App extends Component {
  state = {
    posts: [],
    sortKey: 'voteScore',
    slideClass: 'slide-in'
  }

  sortPosts(sortKey) {
    this.props.getPosts(sortKey);
  }

  componentWillMount = () => {
    this.props.getPosts(this.state.sortKey);
    const width = window.innerWidth;
    if (width < 768) {
      this.setState({ slideClass: 'slide-out' });
    }
  }

  componentWillReceiveProps(newVal) {
    const newPosts = newVal.posts;
    const activePosts = newPosts.filter(p => p.deleted === false);
    this.setState({ posts: activePosts });
  }

  toggleFilters() {
    const slideClass = this.state.slideClass === 'slide-in' ? 'slide-out' : 'slide-in';
    this.setState({ slideClass });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/:category?" render={(props) => (
                <div className="App">
                  <NavBar toggleFilters={this.toggleFilters.bind(this)} />
                  <Posts posts={this.state.posts} {...props} />
                  <Filters slideClass={this.state.slideClass}
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
    posts: state.posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: (sortKey) => dispatch(fetchPosts(sortKey))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
