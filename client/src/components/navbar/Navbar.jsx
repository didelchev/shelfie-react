import React from 'react'
import { useLocation } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import DefaultNavbar from './DefaultNavbar';


const Navbar = () => {

const location  = useLocation();

const isHome = location.pathname === "/" 

const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return null;
  }

return isHome ? <HomeNavbar /> : <DefaultNavbar/>;

  
}

export default Navbar