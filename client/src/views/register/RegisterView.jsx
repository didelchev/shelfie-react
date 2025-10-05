import React, { useState } from 'react'
import "./RegisterView.css"
import { login, register } from '../../api/auth-api'
import { useAuth } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const RegisterView = () => {

  const [authData, setAuthData] = useState({
    email: '',
    username: '',
    password: '',
    're-password': ''
  })


  const [error, setError]  = useState(null);

  const navigate = useNavigate()

 const { setUserData  } = useAuth();


  const changeHandler = (e) => {
    setAuthData({...authData, [e.target.name]: e.target.value});
  }

  const registerHandler = async (e) => {

      e.preventDefault()
      
    const { email, username, password, rePassword } = authData;

    try {
      const newUser  = await register(email, username, password, rePassword)

      localStorage.setItem('auth', JSON.stringify(newUser))

      setUserData(newUser)

      navigate('/')
  


    } catch (error) {

      const errorMessage = error.message || 'An unknown error occured while trying to register !'

      setError(errorMessage)
    }

  }


  return (
    <div className="register-grid-container">
      <div className="left-section">
        <form className="register-form" onSubmit={registerHandler}>
            <h2>Create an account</h2>
            <label htmlFor="email">Email</label>
            <input type="text" id="email" name="email" value={authData.email} onChange={changeHandler} />
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={authData.username} onChange={changeHandler} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={authData.password} onChange={changeHandler}/>
            <label htmlFor="re-password">Repeat Password</label>
            <input type="password" id="re-password" name="re-password" value={authData["re-password"]} onChange={changeHandler}/>
            <button className ='submit' type="submit">Register</button>
            {error && (
              <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '10px', textAlign: "center" }}>
                Login Failed: {error}
              </div>
            )}
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