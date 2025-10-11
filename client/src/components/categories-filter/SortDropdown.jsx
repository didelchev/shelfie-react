import React from 'react';

const SortDropdown = ({ sortCriteria, onSortChange }) => {
    return (
        <div className="sort-section">
            <label htmlFor="sort">Sort by</label>
            <select 
                id="sort" 
                name="sort" 
                onChange={onSortChange} // Handler from useBookCatalog
                value={sortCriteria}   // Controlled input from useBookCatalog
            >
                <option value="none">Default</option>
                <option value="title">Title (A–Z)</option>
                <option value="author">Author</option>
                <option value="rating">Rating (Highest First)</option>
            </select>
        </div>
    );
};

export default SortDropdown;