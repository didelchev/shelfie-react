import React from 'react'
import "./BookTemplate.css"
import { Link } from 'react-router-dom'

const BookTemplate = ({ book }) => {

    const ratingValue = book.rating

  return (
    <div className='book'>
        <Link to={`/catalog/${book._id}`} state= {{book: book} } className='link'>
            <img src={book.image} alt={book.title}/>
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <span className="fa fa-star checked"></span>
            <span>{ratingValue}</span>
    </Link>
     </div>
   
  )
}

export default BookTemplate