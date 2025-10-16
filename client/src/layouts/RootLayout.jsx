import React, { useEffect } from 'react'; 
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet, useLocation } from 'react-router-dom'; 
import { ToastContainer } from "react-toastify";
import AOS from 'aos'; 
import 'aos/dist/aos.css'; 

const RootLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, 
    });
  }, []); 

  useEffect(() => {
    AOS.refresh(); 
  }, [location.pathname]); 



  return (
   <>
   <Navbar />
      <Outlet />
    <Footer />
    <ToastContainer 
        position="bottom-left"
        theme="dark" />
   </>
  );
}

export default RootLayout;