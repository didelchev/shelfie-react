import React from 'react'
import { 
  faLinkedin, 
  faGithub, 
  faDiscord 
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css"

const Footer = () => {
  return (
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>Shelfie</h2>
            <p>Your personal book companion.</p>
          </div>

          <div className="footer-links">
            <h4>Explore</h4>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/catalog">Explore</a></li>
              <li><a href="/login">Login</a></li>
              <li><a href="/register">Register</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="social-icons">
              <a href="https://www.linkedin.com/in/daniel-delchev-7b547a279/" target="_blank" rel="noopener noreferrer">
                {/* <FontAwesomeIcon icon={faLinkedin} /> */}
              </a>
              <a href="https://github.com/didelchev" target="_blank" rel="noopener noreferrer">
                {/* <FontAwesomeIcon icon={faGithub} /> */}
              </a>
              {/* <a href="#"><FontAwesomeIcon icon={faDiscord} /></a> */}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 Shelfie. All rights reserved.</p>
        </div>
      </footer>
  )
}

export default Footer