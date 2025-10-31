import React from "react";
import { Link } from "react-router-dom";
import "./ProfileRecBook.css";

const ProfileRecBook = ({ book }) => {
  const ratingValue = book.ratings.average;

  return (
    <Link to={`/catalog/${book._id}`} className="rec-book">
      <div className="image-container">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-info">
        <h5>{book.title}</h5>
        <h6>{book.author}</h6>
        <span className="fa fa-star checked"></span>
        <span>{ratingValue.toFixed(2)}</span>
      </div>
    </Link>
  );
};

export default ProfileRecBook;
