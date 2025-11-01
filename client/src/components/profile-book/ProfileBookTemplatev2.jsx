import React from "react";
import { Link } from "react-router-dom";

const ProfileBookTemplatev2 = ({ book, onRemove }) => {
  return (
    <Link to={`/catalog/${book._id}`} className="book-item">
      <div className="image-container">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-desc">
        <div className="text-content">
        <h4>{book.title}</h4>
        <p>{book.author}</p>
        <p>{book.description}</p>
      </div>
        <button className="remove-btn" onClick={onRemove}>✖</button>

      </div>
    </Link>
  );
};

export default ProfileBookTemplatev2;
