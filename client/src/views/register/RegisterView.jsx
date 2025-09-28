import React from 'react'
import "./RegisterView.css"

const RegisterView = () => {
  return (
    <div className="register-grid-container">
      <div className="left-section">
        <form className="register-form">
            <h2>Create an account</h2>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
            <label htmlFor="re-password">Repeat Password</label>
            <input type="password" id="re-password" name="re-password" />
            <button className ='submit' type="submit">Register</button>
            <p className="registered">
              Already have an account ? <a href="/login">Sign in</a>
            </p>
        </form>
    </div>
    <div className="right-section">
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
</div>
  )
}

export default RegisterView