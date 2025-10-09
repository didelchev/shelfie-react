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
    setCategoryCriteria([...categoryCriteria, e.target.value])
  }

  

  const displayBooks = useMemo(() => {
    
    const filteredBooks = books.filter((book) => {
       return (
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query)
      );
    })

    const genreInputs = categoryCriteria.map((genre) => {
      return genre.value.charAt(0).toUpperCase() + genre.value.slice(1).toLowerCase();
    })

    let categorizedBooks = filteredBooks.filter((book ) => {
      return book.genre.some(g => genreInputs.includes(g))
    })


    let sortedBooks = [...filteredBooks];

    switch (sortCriteria) {
      case "title":
        sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "rating":
         sortedBooks.sort((a, b) => Number(b.ratings?.average || 0) - Number(a.ratings?.average || 0)); 
         break;
      default:
    }

    return sortedBooks



  },[books, query, sortCriteria, categoryCriteria])


  
  

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
              {["fiction","fantasy","biography","science fiction","business","classics","psychology","mystery","nonfiction","romance"].map((genre) => (
                <label key={genre}>
                  <input type="checkbox" className="genre" value={genre} onClick={categoryHandler} /> {genre.charAt(0).toUpperCase() + genre.slice(1)}
                </label>
              ))}
            </form>
          </div>

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
