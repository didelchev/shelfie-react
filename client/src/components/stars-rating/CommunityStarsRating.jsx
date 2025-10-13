import React, { useEffect, useMemo, useState } from 'react'
import './StarsRating.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons'; 
import { useParams } from 'react-router-dom';



const CommunityStarsRating = ({ bookRatings }) => {
    const [averageRating, setAverageRating] = useState(null);


    const { bookId } = useParams();

  useEffect(() => {
  if (bookRatings) {
    setAverageRating(bookRatings);
  }
}, [bookId, bookRatings]);




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
                
                />
                <FontAwesomeIcon 
                icon={faStar}  
                className={ratingValue <= averageRating ? 'star filled' : 'star'}
                 />      
            </label>
        )
       })}
    </div>
  )
}

export default CommunityStarsRating