import { useState, createContext, useContext } from "react";
import { usePersistedState } from "../hooks/usePersistedState";

const AuthContext = createContext({
    userId: null,
    email: null,
    username: null,
    userProfileImage: null,
    isAuthenticated: false,
    accessToken: null,
    logout: () => null
});


export const AuthContextProvider = ( { children }) => {
    const [userData, setUserData] = usePersistedState('auth', {})

    const logout = ( ) => {
        setUserData(null)
    }

    const contextData = {
            userId: userData?._id,
            email: userData?.email,
            userProfileImage: userData?.image,
            accessToken: userData?.accessToken,
            isAuthenticated: !!userData?.isAuthenticated,
            setUserData,
            logout
        }
    


    return (
        <AuthContext.Provider value={contextData}>
            { children }
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}