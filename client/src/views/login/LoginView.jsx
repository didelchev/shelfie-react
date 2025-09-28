import React from 'react'
import "./LoginView.css"

const LoginView = () => {
  return (
    <div className="login-grid-container">
   <div className="left-section-container" data-aos="fade-right">
    <div className="content">
      <a href="/">
        <img src="#" alt="Logo" className="logo" />
      </a>
      <h1>Your Next Read Awaits</h1>
      <p>
        Organize, discover, and fall in love with books—all in one place.
      </p>
    </div>
  </div>
  <div className="right-section-container" data-aos="fade-left">
      <form  className="login-form">
        <h2>Welcome back</h2>
        <p>Welcome back, please enter your credentials.</p>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Sign in</button>
        <p className="not-registered">
          Don't have an account ? <a href="/register">Sign up for free</a>
        </p>
      </form>
  </div>
</div>
  )
}

export default LoginView