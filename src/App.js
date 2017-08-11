import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import NavBar from './NavBar';
import Posts from './Posts';
import ShowPost from './ShowPost';
import Filters from './Filters';
import * as ReadableAPI from './ReadableAPI';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }

  addPost(post) {
    const posts = [post, ...this.state.posts];
    this.setState({ posts })
  }

  componentWillMount = () => {
    ReadableAPI.getAllPosts().then((posts) => {
      const activePosts = posts.filter(p => p.deleted == false)
      this.setState({ posts: activePosts })
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
                <Filters {...props} />
              </div>
            )}
          />

        <Route path="/:category/:postId" component={ShowPost} />
      </div>
    );
  }
}

export default App;
