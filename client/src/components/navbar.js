import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function GuestNavbar() {
  return (
    <div className="navbar">
      <div className="logo">
        <img className="logo" src="/IconoDeCalendario.jpeg" alt="" width="50px" />
      </div>
      <div className="link">
        <Link to="/login">
          Login
        </Link>
      </div>
      <div className="Link">
        <Link to="/signup">
          Signup
        </Link>
      </div>
    </div>
  );
}

function UserNavbar() {
  function logout() {
    localStorage.removeItem('token');
  }
  return (
    <div className="navbar">
      {/* <div className="logo">
        <img className="logo" src="/IconoDeCalendario.jpeg" alt="" width="50px" />
      </div> */}
      <div className="nav-link">
        <Link to="/home">
          Home
        </Link>
      </div>

      <div className="nav-link">
        <Link to="/group_event">
          Create group event
        </Link>
      </div>

      <div className="nav-link">
        <a href="/" onClick={logout}>
          Log out
        </a>
      </div>

    </div>
  );
}

function Navbar() {
  const token = localStorage.getItem('token');

  if (token) {
    return (
      <UserNavbar />
    );
  }
  return (
    <GuestNavbar />
  );
}

export default Navbar;
