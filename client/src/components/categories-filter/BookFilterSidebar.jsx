import React from 'react';
import SearchForm from './SearchForm';
import SortDropdown from './SortDropdown';
import RatingFilter from './RatingFilter';
import CategoryFilter from './CategoryFilter';

const BookFilterSidebar = ({
  query, sortCriteria, categoryCriteria, ratings,
  onSearchChange, onSortChange, onCategoryChange, onRatingChange, onReset,
  showFilters
}) => {

  return (
    <div className={`left-section-filters ${showFilters ? 'visible' : ''}`}>
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
  );
};

export default BookFilterSidebar;