import React from 'react'
import "./Navbar.css"
import { useLocation } from 'react-router-dom';
import HomeNavbar from './HomeNavbar';
import DefaultNavbar from './DefaultNavbar';


const Navbar = () => {



const location  = useLocation();

const isHome = location.pathname === "/";

return isHome ? <HomeNavbar /> : <DefaultNavbar/>;

  
}

export default Navbar