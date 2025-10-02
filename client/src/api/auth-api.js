import { api } from "./requester"

const API_URL = "https://shelfie-book-app.onrender.com/auth"

export const login = (email, password) => {
    const authData = api.post(`${API_URL}/login`, { email, password})

    return authData
}


export const register = (email, username, password ) => {

}