import React, { useEffect, useMemo, useState } from 'react'
import './StarsRating.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { addBookRating } from '../../api/books-api';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";



const StarsRating = ({ bookRatings, canRate }) => {
    const [rating, setRating] = useState(null);

    const [hover, setHover] = useState(null);

    const { bookId } = useParams();


  useEffect(() => {
  if (bookRatings && bookRatings.userRating) {
    setRating(bookRatings.userRating);
  }
}, [bookId, bookRatings]);

  

    const rateBookHandler = async ( e ) => {

      const bookRating = e.target.value; 

      try {

        await addBookRating(bookId, { rating: bookRating })

        toast.success('Book has been sucessfully rated !')

        setRating(bookRating)
      } catch (error) {

        toast.error('Failed to rate book !')

      }

    } 



  return (
    <div className="stars" id="star-container">
       {[...Array(5)].map((star, index) => {
        let  ratingValue = index + 1;

        return (
            <label key={index}>
                <input 
                type="radio" 
                name="rating"  
                value={ratingValue} 
                onClick= {canRate ? () => onClick(rateBookHandler) : undefined}                
                
                />
                <FontAwesomeIcon 
                icon={faStar}  
                className={ratingValue <= (hover || rating) ? 'star filled' : 'star'}
                onMouseEnter={canRate ?  () => setHover(ratingValue) : undefined }
                onMouseLeave={canRate ? () => setHover(null) : undefined }
                 />      
            </label>
        )
       })}
    </div>
  )
}

export default StarsRating