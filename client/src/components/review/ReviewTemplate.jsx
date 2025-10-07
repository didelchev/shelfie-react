import React from 'react'

const ReviewTemplate = ({review}) => {
  return (
     <div className='review'>
        <div className="image">
          <img src="../../images/profile-blank.webp" alt="Profile picture" />
        </div>
        <div className='user-data'>
            <p className="user-email">{review.userEmail}</p>
            <p>{review.review}</p>
        </div>
    </div>
  )
}

export default ReviewTemplate