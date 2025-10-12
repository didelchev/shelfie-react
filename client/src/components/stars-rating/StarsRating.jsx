import React, { useMemo, useState } from 'react'
import './StarsRating.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { addBookRating } from '../../api/books-api';
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";



const StarsRating = () => {
    const [rating, setRating] = useState(null);

    const [hover, setHover] = useState(null);

    const { bookId } = useParams();

    const getUserRating = useMemo(() => {

    },[rating])


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
                onClick={rateBookHandler}
                
                />
                <FontAwesomeIcon 
                icon={faStar}  
                className={ratingValue <= (hover || rating) ? 'star filled' : 'star'}
                onMouseEnter={() => setHover(ratingValue) }
                onMouseLeave={() => setHover(null) }
                 />      
            </label>
        )
       })}
    </div>
  )
}

export default StarsRating