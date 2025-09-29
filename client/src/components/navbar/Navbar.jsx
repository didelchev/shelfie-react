import React from 'react'
import { Link } from 'react-router-dom'
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
            <li><Link to="/catalog" className='link'>Browse</Link></li>
            <li><Link to="/login" className='link'>Login</Link></li>
            <li><Link to="/register" className='link'>Register</Link></li>
          </ul>
          <ul className="user nav-links">
            <li><Link to="/catalog" className='link'>Browse</Link></li>
            <li><Link to="/profile" className='link'>My Profile</Link></li>
            <li><Link to="javascript:voide(0)" id='logout'>Logout</Link></li>
          </ul>
        </nav>
      </header>
  )
}

export default Navbar