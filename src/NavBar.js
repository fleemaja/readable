import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/">
          <div className="RedCircle"></div>
          <h1 className="LogoFont">readable</h1>
        </Link>
      </nav>
    )
  }
}

export default NavBar;
