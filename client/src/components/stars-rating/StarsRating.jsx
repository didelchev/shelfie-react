import React, { useState } from 'react'
import './StarsRating.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the star icon from the solid set
import { faStar } from '@fortawesome/free-solid-svg-icons'; 


const StarsRating = () => {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


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
                onClick={() => setRating(ratingValue)}
                
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