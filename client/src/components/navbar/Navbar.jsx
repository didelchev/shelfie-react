import React from 'react'
import "./Navbar.css"
import { useLocation } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import DefaultNavbar from './DefaultNavbar';
import { useAuth } from '../../contexts/AuthContext';


const Navbar = () => {

const isAuthenticated = useAuth();

const location  = useLocation();

const isHome = location.pathname === "/" 

const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return null;
  }

return isHome ? <HomeNavbar isAuthenticated={isAuthenticated} /> : <DefaultNavbar isAuthenticated={isAuthenticated}/>;

  
}

export default Navbar