import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faStar } from '@fortawesome/free-solid-svg-icons';

import SearchForm from './SearchForm';
import SortDropdown from './SortDropdown';
import RatingFilter from './RatingFilter';
import CategoryFilter from './CategoryFilter'; 
import ToggleFiltersButton from './ToggleFiltersButton';

const BookFilterSidebar = ({
    query, sortCriteria, categoryCriteria, ratings,
    onSearchChange, onSortChange, onCategoryChange, onRatingChange, onReset}) =>
        
{
    const [showFilters, setShowFilters ] = useState(false);

    const toggleFilters = () => {
        setShowFilters(!showFilters)
        
    }
     
    return (
      <>
        <ToggleFiltersButton toggleFilters={toggleFilters} showFilters={showFilters}/>


        <div className={`left-section-filters ${showFilters ? 'visible' : ''} `}>
          <SearchForm query={query} onSearchChange={onSearchChange} />

          <SortDropdown
            sortCriteria={sortCriteria}
            onSortChange={onSortChange}
          />

          <CategoryFilter
            categoryCriteria={categoryCriteria}
            onCategoryChange={onCategoryChange}
            availableGenres={[
              "Fiction",
              "Fantasy",
              "Biography",
              "Science fiction",
              "Business",
              "Classics",
              "Psychology",
              "Mystery",
              "Nonfiction",
              "Romance",
            ]}
          />

          <RatingFilter ratings={ratings} onRatingChange={onRatingChange} />

          <button className="reset-filters" onClick={onReset}>
            Clear Filters
          </button>
        </div>
      </>
    );
};

export default BookFilterSidebar;