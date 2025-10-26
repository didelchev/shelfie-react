import { Router } from "express";
import { addRating, addReview, getBookReviews, getRating } from "../services/review-service.js";
import { getUserById } from "../services/user-service.js";



const reviewController = Router();

reviewController.get("/:bookId", (req, res) => {
    const bookId = req.params.bookId;
    getBookReviews(bookId)
        .then(reviews => res.json(reviews))
        .catch(err => res.json({message: err}))

})



reviewController.post("/:bookId",  (req,res) => {
    const bookId = req.params.bookId;
    const userEmail = req.user.email;
    const review = req.body.review;
    const userProfileImage = req.body.userImage 
    
    addReview(bookId, userEmail , userProfileImage, review) 
        .then((userReview) => res.status(201).json({review: userReview, message: 'Review added successfully' }))
        .catch(err => res.status(400).json({ message: err.message }) )
})



reviewController.get("/:bookId/ratings", (req, res) => {
    const bookId = req.params.bookId
    const userId = req.user?._id ?? null

    getRating(bookId, userId)
        .then(response => res.json({userRating: response.userRating, average: response.averageRating}))
        .catch(err => res.json({ message: err.message}))

})


reviewController.post("/:bookId/ratings", (req, res) => {
    const bookId = req.params.bookId
    const { rating }  = req.body;
    const userId = req.user._id

    addRating(bookId, userId, rating)
        .then(res => res.json({message: 'Rating added'}))
        .catch(err => res.json({message: err.message}))

})


export default reviewController