import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import RootLayout from "../layouts/RootLayout";
import HomeView from "../views/home/HomeView.jsx";
import LoginView from "../views/login/LoginView";
import RegisterView from "../views/register/RegisterView";
import Logout from "../components/logout/Logout.jsx";
import PageNotFound from "../components/404/404Page.jsx";
import BookDetailsView from "../views/details/DetailsView.jsx";
import ProfileView from "../views/profile/ProfileView.jsx";
import ProtectedRoute from "../components/guard/ProtectedRoute.jsx";
import CatalogViewSkeleton from "../views/catalog/CatalogViewSkeleton.jsx";
import Profilev2 from "../views/profile/Profilev2.jsx";

const CatalogView = React.lazy(() => import("../views/catalog/CatalogView.jsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomeView /> },
      {
        path: "/catalog",
        element: (
          <Suspense fallback={<CatalogViewSkeleton />}>
            <CatalogView />
          </Suspense>
        ),
      },
      { path: "/catalog/:bookId", element: <BookDetailsView /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute requiresAuth>
            {/* <ProfileView /> */}
            <Profilev2/>
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: (
          <ProtectedRoute>
            <LoginView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <ProtectedRoute>
            <RegisterView />
          </ProtectedRoute>
        ),
      },
      {
        path: "/logout",
        element: (
          <ProtectedRoute requiresAuth>
            <Logout />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);
