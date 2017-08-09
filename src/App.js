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

  componentWillMount = () => {
    ReadableAPI.getAllPosts().then((posts) => this.setState({posts}))
  }

  render() {
    return (
      <div>
        <Route exact path="/" render={() => (
              <div className="App">
                <NavBar />
                <Posts posts={this.state.posts}/>
                <Filters />
              </div>
            )}
          />

        <Route path="/:category/:postId" component={ShowPost} />
      </div>
    );
  }
}

export default App;
