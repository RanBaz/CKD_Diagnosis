import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'; // optional, for custom styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2>CKD Dashboard</h2>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/history">History</Link>
      </div>
    </nav>
  );
};

export default Navbar;