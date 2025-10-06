import React from 'react';
import { Link } from 'react-router-dom'; 


function PageNotFound() {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh', 
    textAlign: 'center',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  };

  const statusStyle = {
    fontSize: '6rem', 
    color: "#333",
    marginBottom: '0.5rem',
  };

  const messageStyle = {
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    color: '#333',
  };

  const linkStyle = {
    fontSize: '1.1rem',
    color: 'black', // A common link/primary color
    textDecoration: 'none',
    border: '1px solid #333',
    padding: '10px 20px',
    borderRadius: '5px',
      };

  return (
    <div style={containerStyle}>
      <h1 style={statusStyle}>404</h1>
      <h2 style={messageStyle}>Oops! Page Not Found 😥</h2>
      <p>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link to="/" style={linkStyle}>
        Go to Homepage
      </Link>
    </div>
  );
}

export default PageNotFound;