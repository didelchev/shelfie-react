import React from 'react'
import Navbar from "../components/navbar/Navbar"
import Footer from "../components/footer/Footer"
import { Outlet } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";



const RootLayout = () => {
  return (
   <>
    <Navbar />
      <Outlet />
    <Footer />
    <ToastContainer 
        position="bottom-left"
        theme="dark" />
   </>
  )
}

export default RootLayout