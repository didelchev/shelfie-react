import React, { useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Navigate, replace, useLocation, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiresAuth = false }) => {

    const { isAuthenticated } = useAuth();


    if(requiresAuth && !isAuthenticated){
        return <Navigate to={'/login'} replace/>
    }
    
    if(!requiresAuth && isAuthenticated){
       return <Navigate to={'/'} replace/>
    }

    return children

    //TODO: show error message

}

export default ProtectedRoute