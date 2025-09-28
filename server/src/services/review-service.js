import Book from "../models/Book.js"
import Review from "../models/Review.js"



export const getBookReviews = async (bookId) => {
   const reviews = await Review.find({bookId: bookId })
   return reviews
}

export const addReview = (bookId, userEmail, review) => {
  
   return Review.create({bookId, userEmail, review})
}


export const addRating = (bookId, userId, rating) => {
    return Book.findById(bookId)
      .then(book => {

         //Check if books exists
         if(!book) { 
            throw new Error('Book not found !')
         }
         // Check if user is already rated the book
         const existingRating = book.ratings.details.find(rating =>  rating.userId.equals(userId))

         if(!existingRating){
            //Add new rating 
            book.ratings.details.push({userId, value: rating})
            book.ratings.count += 1
         }else{
            // Update user rating
            existingRating.value = rating
         }

         // Recalculate average
         book.ratings.average = calculateAverageRating(book.ratings)
         
         return book.save()
      })
      .catch(error => res.json({message: error}))
      
}

export const getRating = (bookId, userId) => {
   return Book.findById(bookId)
      .then( book => {
         if(!book){
            throw new Error('Book not found ')
         }

         let userRating = book.ratings.details.find(rating => rating.userId.equals(userId))
         
         let averageRating = book.ratings.average

         if(!userRating){
            userRating = { value: 0}
         }
         return { averageRating, userRating: userRating.value}

      })
}


const calculateAverageRating = ( ratings ) => {

   const sum = ratings.details.reduce((total, rating) => {
      return total += rating.value
   }, 0)

   return sum / ratings.details.length
}

