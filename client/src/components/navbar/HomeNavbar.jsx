import React from 'react'
import { Link } from 'react-router-dom'
import './HomeNavbar.css'
import logo from '../../../public/images/logo.png' // adjust if needed

const HomeNavbar = () => {
  return (
    <header className="home-header">
      <nav className="home-navbar">
        <div className='home-logo-container'>
          <img src={logo} alt="logo" className='home-logo-img' />
          <a className="home-logo" href="/"></a>
        </div>

        <div className="home-burger" id="burger">
          <i className="fas fa-bars"></i>
        </div>

        <ul className="home-guest home-nav-links">
          <li><Link to="/catalog" className='home-link'>Browse</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default HomeNavbar
