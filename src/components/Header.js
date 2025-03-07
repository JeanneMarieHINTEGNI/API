import React from 'react';
import { FaDatabase } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="navbar navbar-dark bg-dark">
      <h1 className="navbar-brand">Ediwin</h1>
      <div className="navbar-nav">
        <a className="nav-link" href="/dashboard"><FaDatabase /> Dashboard</a>
        <a className="nav-link" href="#">Notifications</a>
        <a className="nav-link" href="#">Templates</a>
        <a className="nav-link" href="#">New Query</a>
      </div>
    </header>
  );
};

export default Header;