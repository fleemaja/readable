import React, { Component } from 'react';
import NavBar from './NavBar';
import Posts from './Posts';
import Filters from './Filters';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Posts />
        <Filters />
      </div>
    );
  }
}

export default App;
