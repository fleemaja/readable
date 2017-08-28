import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/lib/fa';

class NavBar extends Component {
  render() {
    return (
      <nav>
        <Link to="/" className="home-link">
          <div className="RedCircle"></div>
          <h1 className="LogoFont">readable</h1>
        </Link>
        {
          !this.props.detail &&
          <FaBars className="hamburger" onClick={this.props.toggleFilters} />
        }
      </nav>
    )
  }
}

export default NavBar;
