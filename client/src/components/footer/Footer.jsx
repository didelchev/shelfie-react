import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"
import { useLocation, Link } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-brand">
          <h2>Shelfie</h2>
          <p>Your personal book companion. Track what you read,<br />discover what's next.</p>
          <div className="social-icons">
            <a href="https://www.linkedin.com/in/daniel-delchev-7b547a279/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a href="https://github.com/didelchev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/catalog">Catalog</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>



      </div>

      <div className="footer-bottom">
        <p>© 2025 Shelfie. All rights reserved.</p>
        <p>Made with ♥ for book lovers</p>
      </div>
    </footer>
  );
};

export default Footer;