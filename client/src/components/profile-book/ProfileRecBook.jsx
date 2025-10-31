import React from 'react'
import { Link } from 'react-router-dom'
import './ProfileRecBook.css'

const ProfileRecBook = ({book}) => {
  return (
    <Link to={`/catalog/${book._id}`} className="rec-book">
          <div className="image-container">
            <img src={book.image} alt={book.title} />
          </div>
          <h5>{book.title }</h5>
        </Link>
  )
}

export default ProfileRecBook

