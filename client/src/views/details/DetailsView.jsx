import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import './DetailsView.css'
import { addBookReview } from "../../api/books-api";

const BookDetailsView = ( ) => {

  const location = useLocation();

  const book = location.state.book

  const { bookId } = useParams();

  const [review, setReview] = useState('')

  const addReviewHandler = async (e) => {
    e.preventDefault();

    const reviewObject = { review : review}

    try {
      await addBookReview(bookId, reviewObject)

      setReview('')
      
    } catch (err) {
        console.log('Error while trying to add a review' + err)
    } 

  }

  const changeHandler = (e) => {
    setReview(e.target.value)

  }




  return (
   <div className="book-details-grid-container">
    <div className="book-details-left">
              <img src={book.image} alt="book" />
      
        <div className='dropdown'>
            <button>Add to Library:</button>
            <div className='options'>
                <button className='dropdown-options' defaultValue='read'>Read</button>
                <button className='dropdown-options' defaultValue='currReading'>Currently Reading</button>
                <button className='dropdown-options' defaultValue='toRead'>Want to Read</button>
            </div>
        </div>

    </div>
    <div className="book-details-right">
        <div className="book-description">
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>
            <div className="stars" id="star-container">
                <span className="star" data-value="1">&#9733;</span>
                <span className="star" data-value="2">&#9733;</span>
                <span className="star" data-value="3">&#9733;</span>
                <span className="star" data-value="4">&#9733;</span>
                <span className="star" data-value="5">&#9733;</span>
            </div>
            <p>{book.description}</p>
        </div>
    </div>
    <div className="book-info">
        <div className="book-info-left">
            <p><span className="label">Pages:</span> {book.pages}</p>
            <p><span className="label">Release date:</span> May 24 1943</p>
            <p><span className="label">Genre:</span> <a href="#">{(book.genre || []).join(", ")}</a></p>
        </div>
        <div className="book-info-right">
            <p><span className="label">Format:</span> Hardcover</p>
            <p><span className="label">Language:</span> English</p>
            <p><span className="label">ISBN:</span>{book.ISBN}</p>
        </div>
    </div>
    <div className="book-average-ratings">
        <h2>Community Ratings</h2>
        <div className = "average-stars-container">
            <h1 className='average-header'></h1>
            <div className='star-wrapper'>
                <span className="average-stars" data-value="1">&#9733;</span>
                <span className="average-stars" data-value="1">&#9733;</span>
                <span className="average-stars" data-value="1">&#9733;</span>
                <span className="average-stars" data-value="1">&#9733;</span>
                <span className="average-stars" data-value="1">&#9733;</span>
                <p className="reviews-count">Based on 23 reviews</p>
            </div>
        </div>
    </div>
    <div className="book-reviews-bottom">
        <h3>Reviews</h3>
        <div className='add-review'>
            <form onSubmit={ addReviewHandler } >
                <input className='review' type="text" name="text" placeholder="Leave a review..." onChange={changeHandler} value={review} />
                <button className='review-btn' type="submit">Add Review</button>
            </form>
        </div>
       
    </div>
</div>
)};

export default BookDetailsView;
