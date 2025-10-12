import React, { useState } from 'react'
import './StarsRating.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the star icon from the solid set
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { addBookRating } from '../../api/books-api';
import { useParams } from 'react-router-dom';


const StarsRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    const { bookId } = useParams();


    const rateBookHandler = async ( e ) => {
      const bookRating = e.target.value; 
      try {

        await addBookRating(bookId, { rating: bookRating })
        
        setRating(bookRating)
      } catch (error) {
        console.log(error)
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