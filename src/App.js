import React, { Component } from 'react';
import NavBar from './NavBar';
import Posts from './Posts';
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
      <div className="App">
        <NavBar />
        <Posts posts={this.state.posts}/>
        <Filters />
      </div>
    );
  }
}

export default App;
