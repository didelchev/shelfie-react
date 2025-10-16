import React from 'react'
import { Link } from 'react-router-dom'
import './DefaultNavbar.css'
import logo from '../../../public/images/logo.png' // adjust if needed


const DefaultNavbar = ({ isAuthenticated }) => {
  return (
    <header className="default-header">
      <nav className="default-navbar">
        <div className='default-logo-container'>
          <img src={logo} alt="logo" className='default-logo-img' />
          <a className="default-logo" href="/">Shelfie</a>
        </div>
        
        <div className="default-burger" id="burger">
          <i className="fas fa-bars"></i>
        </div>

        {isAuthenticated ? (
          <ul className="default-user default-nav-links">
            <li><Link to="/catalog" className='default-link'>Browse</Link></li>
            <li><Link to="/profile" className='default-link'>My Profile</Link></li>
            <li><Link to="/logout" id='logout'>Logout</Link></li>
          </ul>
        ) : (
          <ul className="default-guest default-nav-links">
            <li><Link to="/catalog" className='default-link'>Browse</Link></li>
            <li><Link to="/login" className='default-link'>Login</Link></li>
            <li><Link to="/register" className='default-link'>Register</Link></li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default DefaultNavbar
