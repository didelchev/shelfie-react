import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import "./CatalogView.css"

const CatalogView = () => {
  return (
    <>
      <button id="toggle-filters-btn" className="toggle-filters-btn">
        Show Filters
      </button>

      <main className="book-catalog" data-aos="fade-down">
        <div className="left-section-filters">
          {/* Search Form */}
          <form onSubmit={submitHandler} className="search-form" id="search-form">
            <label htmlFor="search-form">Search</label>
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                onInput={searchHandler}
                placeholder="Search for a book..."
                type="text"
                name="text"
                className="input"
              />
            </div>
          </form>

          {/* Sort Section */}
          <div className="sort-section">
            <label htmlFor="sort">Sort by</label>
            <select id="sort" name="sort" onChange={sortHandler}>
              <option value="title">Title (A–Z)</option>
              <option value="author">Author</option>
              <option value="rating">Rating</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="category-filter">
            <h2 className="category-title">Categories</h2>
            <form onChange={filterHandler} className="category-filter-menu">
              {["fiction","fantasy","biography","science fiction","business","classics","psychology","mystery","nonfiction","romance"].map((genre) => (
                <label key={genre}>
                  <input type="checkbox" className="genre" value={genre} /> {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </label>
              ))}
            </form>
          </div>

          {/* Rating Filter */}
          <div className="rating-filter">
            <h2 className="rating-title">Filter by Rating</h2>
            <form className="rating-list">
              {[5, 4, 3, 2, 1].map((stars) => (
                <label className="rating-row" key={stars}>
                  <input
                    type="radio"
                    name="rating"
                    value={stars}
                    onChange={() => filterByRating(stars)}
                  />
                  <span className="stars">
                    {Array.from({ length: stars }).map((_, i) => (
                      <FontAwesomeIcon icon={faStar} key={`filled-${i}`} className="checked" />
                    ))}
                    {Array.from({ length: 5 - stars }).map((_, i) => (
                      <FontAwesomeIcon icon={faStar} key={`empty-${i}`} />
                    ))}
                  </span>
                  <span className="rating-label"></span>
                </label>
              ))}
            </form>
          </div>
        </div>

        {/* Book Grid */}
        <div className="book-catalog-grid">
          {books.map((book) => bookTemplate(book))}
        </div>
      </main>
    </>
  );
};

export default CatalogView;
