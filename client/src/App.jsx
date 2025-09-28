import React from 'react'
import HomeView from './views/home/HomeView'
import Navbar from './components/navbar/Navbar'
import RegisterView from './views/register/RegisterView'
import LoginView from './views/login/LoginView'

const App = () => {
  return (
   <>
    <Navbar />
    {/* <HomeView /> */}
    {/* <RegisterView /> */}
    <LoginView />
   </>
  )
}

export default App