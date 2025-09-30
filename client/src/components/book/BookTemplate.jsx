import React from 'react'
import "./BookTemplate.css"

const BookTemplate = ({ book }) => {

    const ratingValue = book.rating

  return (
   <div className='book'>
        <a className="link" href="/catalog/${book._id}">
            <img src={book.image} alt={book.title}/>
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <span className="fa fa-star checked"></span>
            <span>{ratingValue}</span>
        </a>
     </div>
  )
}

export default BookTemplate