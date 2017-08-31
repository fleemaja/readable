import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/lib/fa';

const NavBar = ({ detail, toggleFilters }) => (
  <nav>
    <Link to="/" className="home-link">
      <div className="RedCircle"></div>
      <h1 className="LogoFont">readable</h1>
    </Link>
    {
      !detail &&
      <FaBars className="hamburger" onClick={toggleFilters} />
    }
  </nav>
)

export default NavBar;
