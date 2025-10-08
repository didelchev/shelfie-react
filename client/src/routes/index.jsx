import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import  HomeView from  '../views/home/HomeView.jsx'
import LoginView from "../views/login/LoginView";
import RegisterView from "../views/register/RegisterView";
import Logout from "../components/logout/Logout.jsx";
import PageNotFound from "../components/404/404Page.jsx";
import CatalogView from "../views/catalog/CatalogView.jsx";
import BookDetailsView from "../views/details/DetailsView.jsx";
import ProfileView from "../views/profile/ProfileView.jsx";


export const router = createBrowserRouter([
    { 
    path: "/", 
    element: <RootLayout />,
    children:[
        { index: true, element: <HomeView /> },
        { path: "/catalog", element: <CatalogView/>},
        { path: "/catalog/:bookId", element: <BookDetailsView />},
        { path: "/profile", element: <ProfileView />},
        { path: "/login", element: <LoginView /> },
        { path: "/register", element: <RegisterView />},
        { path: "/logout", element: <Logout />},
        { path: '*', element: <PageNotFound />}
    ]

}

])