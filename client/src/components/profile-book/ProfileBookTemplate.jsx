import React from 'react'

const ProfileBookTemplate = ({ book, onRemove }) => {

  return (
    <div className="single-book">
    <div className="image-wrapper">
      <a className="link" href="/catalog/${book._id}">
        <img src={book.image} alt={book.title} />
      </a>
      <button className="remove-btn" onClick={onRemove}>✖</button>
    </div>
  </div>
  )
}

export default ProfileBookTemplate


