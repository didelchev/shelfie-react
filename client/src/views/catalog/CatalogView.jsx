import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import "./CatalogView.css"
import { getAllBooks } from "../../api/books-api";
import BookTemplate from "../../components/book/BookTemplate";
import { filters } from "../../utils/bookFilters";

const CatalogView = () => {
  const [books, setBooks ] = useState([]);

  const [query, setQuery] = useState("");

  const [sortCriteria, setSortCriteria] = useState('none')

  const [categoryCriteria, setCategoryCriteria ] = useState([])

  const [ratings, setRatings] = useState(0)

  useEffect(() => {
    const getBooks = async () => {
      const allBooks = await getAllBooks();
      setBooks(allBooks)
    }
    getBooks()
  },[])

  const searchHandler = (e) => {
     setQuery(e.target.value.toLowerCase());
  }

  const sortHandler = (e) => {
    setSortCriteria(e.target.value)
  }

  const categoryHandler = (e) => {
    const toggledCategory = e.target.value;

    if(e.target.checked && !categoryCriteria.includes(toggledCategory)){

      setCategoryCriteria([...categoryCriteria, toggledCategory])

    }else if(!e.target.checked && categoryCriteria.includes(toggledCategory)){
      
      let updatedCategories = categoryCriteria.filter(category => category !== toggledCategory)

      setCategoryCriteria(updatedCategories)
    }
  }

  const sortByRatingHandler = (e) => {
    setRatings(Number(e.target.value))
  }

  const resetHandler = () => {
    setQuery('');
    setSortCriteria('none')
    setCategoryCriteria([])
    setRatings(0);
  }
  
  const displayBooks = useMemo(() => {

    let currentBooks = books

    currentBooks = filters.search(currentBooks, query)

    currentBooks = filters.categorize( currentBooks, categoryCriteria)

    currentBooks = filters.sortByRating(currentBooks, ratings)

    const finalSortedBooks = filters.sort(currentBooks, sortCriteria)
    
    return finalSortedBooks



  },[books, query, sortCriteria, categoryCriteria, ratings])


  
  

  return (
    <>
      <main className="book-catalog" data-aos="fade-down">
        <div className="left-section-filters">
          {/* Search Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="search-form"
            id="search-form"
          >
            <label htmlFor="search-form">Search</label>
            <div className="search-input-wrapper">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                onChange={searchHandler}
                placeholder="Search for a book..."
                type="text"
                name="text"
                className="input"
                value={query}
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
            <form  className="category-filter-menu">
              {["Fiction","Fantasy","Biography","Science fiction","Business","Classics","Psychology","Mystery","Nonfiction","Romance"].map((genre) => (
                <label key={genre}>
                  <input type="checkbox" className="genre" value={genre} onClick={categoryHandler} /> { genre }
                </label>
              ))}
            </form>
          </div>
          <div className="rating-filter">
            <h2 className="rating-title">Filter by Rating</h2>
            <form className="rating-list">
              {[5, 4, 3, 2, 1].map((stars) => (
                <label className="rating-row" key={stars}>
                  <input
                    type="radio"
                    name="rating"
                    value={stars}
                    onChange={sortByRatingHandler}
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
          <button className="reset-filters" onClick={resetHandler}>Reset Filters</button>

        </div>

        <div className="book-catalog-grid">
          {displayBooks.map((book) => {
            return <BookTemplate book={book} key={book._id} />;
          })}
        </div>
      </main>
    </>
  );
};

export default CatalogView;
