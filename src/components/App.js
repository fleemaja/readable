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
    sortKey: 'voteScore'
  }

  sortPosts(sortKey) {
    this.setState({ sortKey });
    const posts = this.state.posts.sort(this.sortByKey(sortKey).bind(this));
    this.setState({ posts });
  }

  sortByKey(sortKey) {
    return function(a, b) {
      return a[sortKey] < b[sortKey];
    }
  }

  componentWillMount = () => {
    this.props.getPosts();
  }

  componentWillReceiveProps(newVal) {
    const newPosts = newVal.posts;
    const activePosts = newPosts.filter(p => p.deleted === false);
    this.setState({ posts: activePosts });
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/:category?" render={(props) => (
                <div className="App">
                  <NavBar />
                  <Posts posts={this.state.posts} {...props} />
                  <Filters sortPosts={this.sortPosts.bind(this)}
                           {...props} />
                </div>
              )}
            />

          <Route path="/:category/:postId" component={ShowPost} />
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
    getPosts: () => dispatch(fetchPosts())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
