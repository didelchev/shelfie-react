import React, { useEffect, useState } from "react";
import "./CatalogView.css";
import { getAllBooks } from "../../api/books-api";
import BookTemplate from "../../components/book/BookTemplate";
import { useBookCatalog } from "../../hooks/useBookCatalog";
import BookFilterSidebar from "../../components/categories-filter/BookFilterSidebar";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";
import DefaultNavbar from "../../components/navbar/DefaultNavbar";

const CatalogView = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const getBooks = async () => {
      try {
        const allBooks = await getAllBooks();
        setBooks(allBooks);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    getBooks();
  }, []);

  const {
    displayBooks,
    query,
    sortCriteria,
    categoryCriteria,
    ratings,
    searchHandler,
    sortHandler,
    categoryHandler,
    sortByRatingHandler,
    resetHandler,
  } = useBookCatalog(books);

  return (
    <>
      <DefaultNavbar />
      <main className="book-catalog" data-aos="fade-down">

        <BookFilterSidebar
          query={query}
          sortCriteria={sortCriteria}
          categoryCriteria={categoryCriteria}
          ratings={ratings}
          onSearchChange={searchHandler}
          onSortChange={sortHandler}
          onCategoryChange={categoryHandler}
          onRatingChange={sortByRatingHandler}
          onReset={resetHandler}
          showFilters={showFilters}
        />

        <div className="catalog-main-content">
          <div className="catalog-top-bar">
            <button
              className="toggle-filters-btn"
              onClick={() => setShowFilters((prev) => !prev)}
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>

            <div className="catalog-header">
              <h1>Browse Books</h1>
              {!isLoading && (
                <span className="catalog-results-count">
                  {displayBooks.length} {displayBooks.length === 1 ? "book" : "books"}
                </span>
              )}
            </div>
          </div>

          {isLoading ? (
            <SpinnerComponent customCss={{ marginTop: "30vh" }} />
          ) : (
            <div className="book-catalog-grid">
              {displayBooks.map((book) => (
                <BookTemplate book={book} key={book._id} />
              ))}
            </div>
          )}
        </div>

      </main>
    </>
  );
};

export default CatalogView;