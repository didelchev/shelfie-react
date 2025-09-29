import React from 'react'
import "./BookTemplate.css"

const BookTemplate = () => {
    const book = {
        title: "Harry Potter",
        author: "J.K Rowling",
        ratings:"5"

    }
  return (
   <div className='book'>
        <a className="link" href="/catalog/${book._id}">
            <img src="/images/book3.webp" alt={book.title}/>
            <h5>{book.title}</h5>
            <p>{book.author}</p>
            <span className="fa fa-star checked"></span>
            <span>{book.ratings}</span>
        </a>
     </div>
  )
}

export default BookTemplate