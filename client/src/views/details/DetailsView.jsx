import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addBookReview, getBookReviews } from "../../api/books-api";
import ReviewTemplate from "../../components/review/ReviewTemplate";
import { useAuth } from "../../contexts/AuthContext";
import SelectShelfComponent from "../../components/shelf/SelectShelfComponent";
import StarsRating from "../../components/stars-rating/StarsRating";
import "./DetailsView.css";
import { getUserBookRating } from "../../api/user-api";
import CommunityStarsRating from "../../components/stars-rating/CommunityStarsRating";
import DefaultNavbar from "../../components/navbar/DefaultNavbar";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

const BookDetailsView = () => {
  const location = useLocation();
  const book = location.state?.book;
  const { isAuthenticated, userProfileImage } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { bookId } = useParams();
  const [review, setReview] = useState("");
  const [userReviews, setUserReviews] = useState([]);
  const [bookRatings, setBookRatings] = useState({
    userRating: "",
    averageRating: "",
    ratingCount: "",
  });

  const addReviewHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await addBookReview(bookId, {
        review,
        userProfileImage,
      });
      setUserReviews([...userReviews, response.review]);
      setReview("");
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getReviews = async () => {
      try {
        const reviews = await getBookReviews(bookId);
        setUserReviews(reviews);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    getReviews();
  }, [bookId]);

  useEffect(() => {
    (async () => {
      try {
        const userBookRating = await getUserBookRating(bookId);
        setBookRatings(userBookRating);
      } catch (error) {
        console.log("Error fetching book ratings: " + error);
      }
    })();
  }, [bookId]);

  const displayAverage = bookRatings.averageRating
    ? parseFloat(bookRatings.averageRating).toFixed(1)
    : "—";

  const reviewsCountText = bookRatings.ratingCount
    ? `${bookRatings.ratingCount} ratings`
    : "No ratings yet";

  if (isLoading) {
    return (
      <>
        <DefaultNavbar />
        <SpinnerComponent customCss={{ marginTop: "45vh" }} />
      </>
    );
  }

  return (
    <>
      <DefaultNavbar />
      <div className="details-page">
        <div className="details-top">
          <div className="details-cover-wrap">
            <img className="details-cover" src={book.image} alt={book.title} />
            {isAuthenticated && <SelectShelfComponent bookId={bookId} />}
          </div>

          <div className="details-info">
            <h1>{book.title}</h1>
            <h3>{book.author}</h3>

            {book.genre?.length > 0 && (
              <div className="genre-tags">
                {book.genre.map((g, i) => (
                  <span key={i} className="genre-tag">
                    {g}
                  </span>
                ))}
              </div>
            )}

            {isAuthenticated && (
              <div className="your-rating-wrap">
                <span className="rating-label">Your rating</span>
                <StarsRating bookRatings={bookRatings} canRate={true} />
              </div>
            )}

            <div className="details-facts">
              <div className="fact-item">
                <span className="fact-label">Pages</span>
                <span className="fact-value">{book.pages}</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Format</span>
                <span className="fact-value">Hardcover</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">Language</span>
                <span className="fact-value">English</span>
              </div>
              <div className="fact-item">
                <span className="fact-label">ISBN</span>
                <span className="fact-value">{book.ISBN}</span>
              </div>
            </div>

            <p className="details-description">{book.description}</p>
          </div>
        </div>

        <hr className="details-divider" />

        <div className="details-bottom">
          <div className="details-reviews">
            <h3>Reviews</h3>

            {isAuthenticated && (
              <div className="add-review-form">
                <input
                  className="review-input"
                  type="text"
                  placeholder="Share your thoughts on this book..."
                  onChange={(e) => setReview(e.target.value)}
                  value={review}
                />
                <button className="review-btn" onClick={addReviewHandler}>
                  Post Review
                </button>
              </div>
            )}

            {userReviews.length === 0 ? (
              <p className="no-reviews-msg">No reviews yet — be the first!</p>
            ) : (
              userReviews.map((review, index) => (
                <ReviewTemplate review={review} key={index} />
              ))
            )}
          </div>

          <div className="community-ratings-sidebar">
            <h4>Community Rating</h4>
            <div className="community-score-number">{displayAverage}</div>
            <CommunityStarsRating bookRatings={bookRatings.averageRating} />
            <div className="community-score-count">{reviewsCountText}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookDetailsView;
