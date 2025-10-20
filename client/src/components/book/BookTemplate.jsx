import React from 'react'
import { Link } from 'react-router-dom'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const BookTemplate = ({ book }) => {
``
  const ratingValue = book.ratings.average

  return (
    <div className='book'>
      <Link to={`/catalog/${book._id}`} state= {{book: book} } className='link'>
          <img src={book.image} alt={book.title}/>
          <h5>{book.title}</h5>
          <p>{book.author}</p>
          <span className="fa fa-star checked"></span>
          <span>
            {ratingValue.toFixed(2)}
          </span>
            
    </Link>
     </div>
   
  )
}

export default BookTemplate
