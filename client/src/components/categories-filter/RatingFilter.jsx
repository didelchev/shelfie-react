import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const RatingFilter = ({ ratings, onRatingChange }) => {
    return (
        <div className="rating-filter">
            <h2 className="rating-title">Filter by Rating</h2>
            <form className="rating-list">
                {[5, 4, 3, 2, 1].map((stars) => (
                    <label className="rating-row" key={stars}>
                        <input
                            type="radio"
                            name="rating"
                            value={stars}
                            onChange={onRatingChange} // Handler from useBookCatalog
                            checked={ratings === stars} // Controlled state: true if the state matches this stars value
                        />
                        <span className="stars">
                            {/* Render 5 stars, coloring them based on the current iteration (stars) */}
                            {Array.from({ length: 5 }).map((_, i) => (
                                <FontAwesomeIcon 
                                    icon={faStar} 
                                    key={i} 
                                    className={i < stars ? "checked" : ""} 
                                />
                            ))}
                        </span>
                    </label>
                ))}
            </form>
        </div>
    );
};

export default RatingFilter;