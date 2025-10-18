import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import './DefaultNavbar.css'
import logo from '../../../public/images/logo-black.png' // adjust if needed


const DefaultNavbar = ({ isAuthenticated }) => {



  return (
    <header className="default-header">
      <nav className="default-navbar">
        <div className='default-logo-container'>
          <img src={logo} alt="logo" className='default-logo-img' />
          <NavLink to='/' className="default-logo" href="/">Shelfie</NavLink>
        </div>
        
        <div className="default-burger" id="burger">
          <i className="fas fa-bars"></i>
        </div>

        {isAuthenticated ? (
          <ul className="default-user default-nav-links">
            <li><NavLink to="/catalog" className='default-link'>Browse</NavLink></li>
            <li><NavLink to="/profile" className='default-link'>My Profile</NavLink></li>
            <li><NavLink to="/logout" id='logout'>Logout</NavLink></li>
          </ul>
        ) : (
          <ul className="default-guest default-nav-links">
            <li><NavLink to="/catalog" className='default-link'>Browse</NavLink></li>
            <li><NavLink to="/login" className='default-link'>Login</NavLink></li>
            <li><NavLink to="/register" className='default-link'>Register</NavLink></li>
          </ul>
        )}
      </nav>
    </header>
  )
}

export default DefaultNavbar
