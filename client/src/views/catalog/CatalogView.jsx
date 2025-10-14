import React, { useEffect, useMemo, useState } from "react";

import "./CatalogView.css"
import { getAllBooks } from "../../api/books-api";
import BookTemplate from "../../components/book/BookTemplate";
import { useBookCatalog } from "../../hooks/useBookCatalog";
import BookFilterSidebar from "../../components/categories-filter/BookFilterSidebar";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

const CatalogView = () => {
  const [books, setBooks ] = useState([]);

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const getBooks = async () => {
      try {
        setIsLoading(true);

        const allBooks = await getAllBooks();

        setBooks(allBooks)  

        setIsLoading(false)

      } catch (error) {
        setIsLoading(false);
        console.log(error)
      }
      
    }
    getBooks()
  },[])

  
const { 
        displayBooks, 
        query, sortCriteria, categoryCriteria, ratings, 
        searchHandler, sortHandler, categoryHandler, sortByRatingHandler, resetHandler 
    } = useBookCatalog(books)

  
  

  return (
    <>
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
            />
            {isLoading ? <SpinnerComponent /> : (
              <div className="book-catalog-grid">
              {displayBooks.map((book) => {
                return <BookTemplate book={book} key={book._id} />;
              })}
            </div>
            )}
          </main>
    </>
  );
}

export default CatalogView;
