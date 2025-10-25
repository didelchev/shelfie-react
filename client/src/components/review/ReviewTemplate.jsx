import React from 'react'
import './ReviewTemplate.css'

const ReviewTemplate = ({review}) => {
  
  return (
     <div className='review-template'> 
        <div className="image">
          
          <img src={review?.userProfileImage} alt="Profile picture" />
        </div>
        <div className='user-info'> 
            <p className="user-email">{review?.userEmail}</p>
            <div className='review-content'> 
              <p>{review?.review}</p>
            </div>
        </div>
    </div>
  )
}

export default ReviewTemplate