import React from "react";
import { Link } from "react-router-dom";

const ProfileBookTemplatev2 = ({ book, onRemove }) => {
  return (
    <Link to={`/catalog/${book._id}`} className="book-item">
      <div className="image-container">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-desc">
        <h3>{book.title}</h3>
        <h5>{book.author}</h5>
        <p>{book.description}</p>
        <button className="remove-btn" onClick={onRemove}>✖</button>

      </div>
    </Link>
  );
};

export default ProfileBookTemplatev2;
