import React, { useState } from "react";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import './BurgerComponent.css'

const BurgerComponent = () => {
  const [isOpen, setOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false); 
  };

  return (
    <>
      <div className="burger-menu-container">
      
      <div className="hamburger-wrapper">
        <Hamburger
          toggled={isOpen} 
          toggle={setOpen} 
          size={24}       
          color={isOpen ? '#333' : "#f2f2f2"}    
          direction="left"
          duration={0.8}  
        />
      </div>

      <nav className={`menu-panel ${isOpen ? 'visible' : ''}`}>
        <ul>
          <li><Link to="/" onClick={closeMenu}>Home</Link></li>
          <li><Link to="/discover" onClick={closeMenu}>Browse Books</Link></li>
          <li><Link to="/login" onClick={closeMenu}>Login</Link></li>
          <li><Link to="/register" onClick={closeMenu}>Register</Link></li>
          <li><Link to="/profile" onClick={closeMenu}>My Profile</Link></li>
          <li><Link to="/logout" onClick={closeMenu}>Logout</Link></li>
        </ul>
      </nav>
    </div>
    </>
  );
};

export default BurgerComponent;