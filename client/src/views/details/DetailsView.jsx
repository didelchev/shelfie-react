import React from "react";

const BookDetails = () => {
  return (
    <div className="book-details-grid-container">
      {/* Left Section */}
      <div className="book-details-left">
        <img src={book.image} alt={book.title} />

        {isLogged() && (
          <div className="dropdown">
            <button>Add to Library:</button>
            <div className="options">
              <button className="dropdown-options" value="read">Read</button>
              <button className="dropdown-options" value="currReading">Currently Reading</button>
              <button className="dropdown-options" value="toRead">Want to Read</button>
            </div>
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="book-details-right">
        <div className="book-description">
          <h1>{book.title}</h1>
          <h3>{book.author}</h3>
          <div className="stars" id="star-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="star" data-value={star}>&#9733;</span>
            ))}
          </div>
          <p>{book.description}</p>
        </div>
      </div>

      {/* Book Info */}
      <div className="book-info">
        <div className="book-info-left">
          <p><span className="label">Pages:</span> {book.pages}</p>
          <p><span className="label">Release date:</span> May 24 1943</p>
          <p>
            <span className="label">Genre:</span>{" "}
            <a href="#">{(book.genre || []).join(", ")}</a>
          </p>
        </div>
        <div className="book-info-right">
          <p><span className="label">Format:</span> Hardcover</p>
          <p><span className="label">Language:</span> English</p>
          <p><span className="label">ISBN:</span> 199123</p>
        </div>
      </div>

      {/* Community Ratings */}
      <div className="book-average-ratings">
        <h2>Community Ratings</h2>
        <div className="average-stars-container">
          <h1 className="average-header"></h1>
          <div className="star-wrapper">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="average-stars" data-value={star}>&#9733;</span>
            ))}
            <p className="reviews-count">Based on 23 reviews</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="book-reviews-bottom">
        <h3>Reviews</h3>

        {/* {isLogged() && (
          <div className="add-review">
            <form onSubmit={(e) => addReview(e, book._id)}>
              <input
                className="review"
                type="text"
                name="text"
                placeholder="Leave a review..."
              />
              <button className="review-btn" type="submit">Add Review</button>
            </form>
          </div>
        )} */}

        {/* {!reviews.length ? (
          <h3>No Reviews Yet</h3>
        ) : (
          reviews.map((review) => reviewTemplate(review))
        )} */}
      </div>
    </div>
  );
};

export default BookDetails;
