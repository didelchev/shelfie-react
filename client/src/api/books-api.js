import { api } from "./requester.js"


const API_URL = "https://shelfie-book-app.onrender.com"

export const getAllBooks = () => api.get(`${API_URL}/catalog`)

export const getOneBook = (bookId) => api.get(`${API_URL}/catalog/${bookId}`)

export const getLatestBooks = () => api.get(`${API_URL}/catalog`)

export const addBookReview = (bookId, review) => api.post(`${API_URL}/reviews/${bookId}`, review) 

export const addBookToShelf = (bookId, shelf) => api.post(`${API_URL}/catalog/${bookId}`, shelf)

export const getBookReviews = (bookId) => api.get(`${API_URL}/reviews/${bookId}`)

export const addBookRating = (bookId, rating) => api.post(`${API_URL}/reviews/${bookId}/ratings`, rating)

export const fetchBooksForShelf = async (bookShelf) => {
    
    const stringIds = bookShelf.map(item => item);
    
    const bookPromise = stringIds.map(id => getOneBook(id));
    
    const books = await Promise.all(bookPromise);

    return books
}
