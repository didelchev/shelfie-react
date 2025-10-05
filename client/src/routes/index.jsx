import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import  HomeView from  '../views/home/HomeView.jsx'
import LoginView from "../views/login/LoginView";
import RegisterView from "../views/register/RegisterView";
import Logout from "../components/logout/Logout.jsx";


export const router = createBrowserRouter([
    { 
    path: "/", 
    element: <RootLayout />,
    children:[
        { index: true, element: <HomeView /> },
        { path: "/login", element: <LoginView /> },
        { path: "/register", element: <RegisterView />},
        { path: "/logout", element: <Logout />}
    ]

}

])