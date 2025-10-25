import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addBookReview, addBookToShelf, getBookReviews} from "../../api/books-api";
import ReviewTemplate from "../../components/review/ReviewTemplate";
import { useAuth } from "../../contexts/AuthContext";
import SelectShelfComponent from "../../components/shelf/SelectShelfComponent";
import StarsRating from "../../components/stars-rating/StarsRating";
import "./DetailsView.css";
import { getUserBookRating } from "../../api/user-api";
import CommunityStarsRating from "../../components/stars-rating/CommunityStarsRating";
import DefaultNavbar from "../../components/navbar/DefaultNavbar";

const BookDetailsView = () => {
  const location = useLocation();

  const book = location.state.book;
  const { isAuthenticated } = useAuth();

  const { bookId } = useParams();

  // Changed state to an empty string to allow for a textarea look in CSS
  const [review, setReview] = useState(""); 
  const [userReviews, setUserReviews] = useState([]);

  const [bookRatings, setBookRatings] = useState({
    userRating: "",
    average: ""
  })

  const addReviewHandler = async (e) => {
    e.preventDefault();
    const reviewObject = { review };

    try {
      const newReview = await addBookReview(bookId, reviewObject);
      // Ensure the new review object is correctly structured before adding it
      // Assuming newReview.review is the full object (including user info)
      setUserReviews([...userReviews, newReview.review]);

      setReview("");
    } catch (err) {
      console.log(err.message);
    }
  };

  const changeHandler = (e) => {
    setReview(e.target.value);
  };
  
  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await getBookReviews(bookId);

        setUserReviews(reviews);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, [bookId]);
  
  useEffect(() => {
    (async () => {

      try {

        const userBookRating =  await getUserBookRating(bookId)
        
        setBookRatings(userBookRating)

      } catch (error) {
          console.log('Error while fetching book ratings' + error)
        }
    })()
  },[bookId])

  // Helper to format average rating for display
  const displayAverage = bookRatings.average ? parseFloat(bookRatings.average).toFixed(2) : 'N/A';
  // Assuming the number of reviews is available in a property like book.reviewsCount
  const reviewsCountText = book.reviewsCount ? `(${book.reviewsCount} ratings)` : '(0 ratings)';

  return (
  <>
    <DefaultNavbar />

    <div className="book-details-grid-container">
      <div className="book-details-left">
 
        <img src={book.image} alt="book" />
        {isAuthenticated ? (
        <SelectShelfComponent bookId={bookId} />
        ): null}
      </div>
      <div className="book-details-right">
        <div className="book-description">
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
          { isAuthenticated ? (
      
            <StarsRating bookRatings={bookRatings} canRate={true}/>
          ) : null}
          <p>{book.description}</p>
        </div>
        <div></div>
      </div>
      <div className="book-info">
        <div className="book-info-left">
          <p>
            <span className="label">Pages:</span> {book.pages}
      
          </p>
          <p>
            <span className="label">Release date:</span> May 24 1943 
          </p>
          <p>
            <span className="label">Genre:</span>{" "}
            <a href="#">{(book.genre ||
          []).join(", ")}</a>
          </p>
        </div>
        <div className="book-info-right">
          <p>
            <span className="label">Format:</span> Hardcover
          </p>
          <p>
            <span className="label">Language:</span> English
          </p>
    
          <p>
            <span className="label">ISBN:</span>
            {book.ISBN}
          </p>
        </div>
      </div>
      <div className="book-average-ratings">
        <h2>Community Ratings</h2>
        <div className="average-stars-container">
          {/* Display the average number prominently */}
          <h1 className="average-header">{displayAverage}</h1> 
         
          <div className="star-wrapper">
            <CommunityStarsRating bookRatings={bookRatings.average} />
            {/* Using text from a placeholder property for the count */}
            <p className="reviews-count">{reviewsCountText}</p> 
          </div>
        </div>
      </div>
      <div className="book-reviews-bottom">
        <h3>Reviews</h3>

        {isAuthenticated && (
          <div className="add-review">
            <form 
              onSubmit={addReviewHandler}>
              <input
                className="review-input" 
                type="text"
                name="text"
                placeholder="Leave a review..."
                onChange={changeHandler}
    
                value={review}
              />
              <button className="review-btn" type="submit">
                Add Review
              </button>
            </form>
          </div>
     
       )}

        {userReviews.map((review, index) => {
          return <ReviewTemplate review={review} key={index} className="review-template" />; {/* Added class */}
        })}
      </div>
    </div>
  </>
    
  );
}

export default BookDetailsView;