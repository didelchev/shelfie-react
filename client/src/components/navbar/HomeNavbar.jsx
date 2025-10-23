import React from 'react'
import { Link } from 'react-router-dom'
import './HomeNavbar.css'
import logo from '../../../public/images/logo.png'
import BurgerComponent from '../burger/BurgerComponent'

const HomeNavbar = () => {

  
  return (
    <header className="home-header">
      <nav className="home-navbar">
        <div className='home-logo-container'>
          <img src={logo} alt="logo" className='home-logo-img' />
          <a className="home-logo" href="/"></a>
        </div>
        <BurgerComponent />
        <ul className="home-guest home-nav-links">
          <li><Link to="/catalog" className='home-link'>Browse Books</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default HomeNavbar
