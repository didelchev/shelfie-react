import React from 'react';

const CategoryFilter = ({ categoryCriteria, onCategoryChange, availableGenres }) => {
    return (
        <div className="category-filter">
            <h2 className="category-title">Categories</h2>
            <form className="category-filter-menu">
                {availableGenres.map((genre) => (
                    <label key={genre}>
                        <input 
                            type="checkbox" 
                            className="genre" 
                            value={genre} 
                            onChange={onCategoryChange} 
                            checked={categoryCriteria.includes(genre)} 
                        /> 
                        {genre}
                    </label>
                ))}
            </form>
        </div>
    );
};

export default CategoryFilter;