import React from 'react'
import "./Navbar.css"

const Navbar = () => {
  return (
    <header className="header">
        <nav className="navbar">
          <a className="logo" href="/">Shelfie</a>
          <div className="burger" id="burger">
            <i className="fas fa-bars"></i>
          </div>
          <ul className="guest nav-links">
            <li><a href="/catalog" className="link">Browse</a></li>
            <li><a href="/login" className="link">Login</a></li>
            <li><a href="/register" className="link">Register</a></li>
          </ul>
          <ul className="user nav-links">
            <li><a href="/catalog" className="link">Browse</a></li>
            <li><a href="/profile" className="link">My Profile</a></li>
            <li><a href="javascript:void(0)" id="logout">Logout</a></li>
          </ul>
        </nav>
      </header>
  )
}

export default Navbar