import { useState, createContext, useContext } from "react";

const AuthContext = createContext({
    userId: null,
    email: null,
    username: null,
    isAuthenticated: false,
    accessToken: null
});


export const AuthContextProvider = ( { children }) => {
    const [userData, setUserData ] = useState(() => {
        try {
            const storedUser = localStorage.getItem('auth');

            if(!storedUser){
                return null
            }

            return JSON.parse(storedUser)

        } catch (error) {
            console.log("Error reading 'auth' from localStorage:", error)

            return null
        }
    })

    const contextData = {
            userId: userData?._id,
            email: userData?.email,
            accessToken: userData?.accessToken,
            isAuthenticated: !!userData?.isAuthenticated,
            setUserData
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