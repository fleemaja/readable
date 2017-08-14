import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import NavBar from './NavBar';
import Posts from './Posts';
import ShowPost from './ShowPost';
import Filters from './Filters';
import * as ReadableAPI from '../utils/ReadableAPI';

class App extends Component {
  state = {
    posts: [],
    sortKey: ''
  }

  addPost(post) {
    const posts = [post, ...this.state.posts];
    this.setState({ posts })
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
    ReadableAPI.getAllPosts().then((posts) => {
      const activePosts = posts.filter(p => p.deleted === false)
      this.setState({ posts: activePosts })
      this.sortPosts('voteScore')
    })
  }

  render() {
    return (
      <div>
        <Route exact path="/:category?" render={(props) => (
              <div className="App">
                <NavBar />
                <Posts addPost={this.addPost.bind(this)}
                       posts={this.state.posts}
                       {...props} />
                <Filters sortPosts={this.sortPosts.bind(this)}
                         {...props} />
              </div>
            )}
          />

        <Route path="/:category/:postId" component={ShowPost} />
      </div>
    );
  }
}

export default App;
