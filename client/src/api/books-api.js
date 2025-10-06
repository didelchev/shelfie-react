import { api } from "./requester.js"


const API_URL = "https://shelfie-book-app.onrender.com/catalog"

export const getAllBooks = () => api.get(API_URL)

export const getOneBook = (bookId) => api.get(`${API_URL}/${bookId}`)

export const getLatestBooks = () => api.get(API_URL)

export const addBookReview = (bookId, review) => api.post(`${API_URL}/${bookId}`, review) 
