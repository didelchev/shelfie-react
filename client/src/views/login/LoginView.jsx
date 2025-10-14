import React, { useEffect, useState } from 'react'
import "./LoginView.css"
import { login } from '../../api/auth-api'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";



const LoginView = () => {

const [authData, setAuthData] = useState({
  email: "",
  password: ""
})

const [error, setError] = useState(null)

const navigate = useNavigate();

const { setUserData  } = useAuth();



const changeHandler = (e) => {
  setAuthData({...authData, [e.target.name] : e.target.value})
  
}


const loginHandler = async (e) => {

e.preventDefault()
  const { email, password } = authData;

try {

  const user = await login(email, password)

  setUserData(user)

  toast.success('Login successfull !')

  navigate('/')

  
} catch (error) {

  const errorMessage = error.message || 'An unknown error occured during login attemp.'

  setError(errorMessage)
}

}


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
      <form  className="login-form" onSubmit={loginHandler}>
        <h2>Welcome back</h2>
        <p>Welcome back, please enter your credentials.</p>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" value={authData.email} onChange={changeHandler} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" value={authData.password} onChange={e => { setAuthData({...authData, password: e.target.value})}} />
        <button type="submit" >Sign in</button>
        {error && (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '10px', textAlign: "center" }}>
        Login Failed: {error}
      </div>
    )}
        <p className="not-registered">
          Don't have an account ? <a href="/register">Sign up for free</a>
        </p>
      </form>
  </div>
</div>
  )
}

export default LoginView