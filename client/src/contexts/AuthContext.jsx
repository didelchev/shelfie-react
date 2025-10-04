import { useState, createContext, useContext } from "react";

const AuthContext = createContext({
    userId: null,
    email: null,
    username: null,
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



    return (
        <AuthContext.Provider value={{userData, setUserData}}>
            { children }
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}