import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({ query, onSearchChange }) => {
    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="search-form"
            id="search-form"
        >
            <label htmlFor="search-form">Search</label>
            <div className="search-input-wrapper">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                <input
                    onChange={onSearchChange}
                    placeholder="Search for a book..."
                    type="text"
                    name="text"
                    className="input"
                    value={query} 
                />
            </div>
        </form>
    );
};

export default SearchForm;