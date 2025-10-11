import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import SearchForm from './SearchForm';
import SortDropdown from './SortDropdown';
import RatingFilter from './RatingFilter';
import CategoryFilter from './CategoryFilter'; 

const BookFilterSidebar = ({
    query, sortCriteria, categoryCriteria, ratings,
    onSearchChange, onSortChange, onCategoryChange, onRatingChange, onReset
}) => {
    return (
        <div className="left-section-filters">
            
            {/* Search Form */}
            <SearchForm 
                query={query} 
                onSearchChange={onSearchChange} 
            />

            {/* Sort Dropdown */}
            <SortDropdown 
                sortCriteria={sortCriteria} 
                onSortChange={onSortChange} 
            />

            {/* Category Filter */}
            <CategoryFilter 
                categoryCriteria={categoryCriteria} 
                onCategoryChange={onCategoryChange} 
                availableGenres={["Fiction","Fantasy","Biography","Science fiction","Business","Classics","Psychology","Mystery","Nonfiction","Romance"]}
            />

            {/* Rating Filter */}
            <RatingFilter 
                ratings={ratings} 
                onRatingChange={onRatingChange} 
            />

            {/* Reset Button */}
            <button 
                className="reset-filters" 
                onClick={onReset}
            >
                Clear Filters
            </button>

        </div>
    );
};

export default BookFilterSidebar;