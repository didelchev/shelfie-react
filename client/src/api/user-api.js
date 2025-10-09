import { api } from "./requester";


const API_URL = "https://shelfie-book-app.onrender.com"



export const getUserCredentials = () => api.get(`${API_URL}/profile`)



export const editUserCredentials = ( updatedUser ) => api.patch(`${API_URL}/profile`, updatedUser)