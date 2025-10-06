import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faStar } from "@fortawesome/free-solid-svg-icons";
import "./CatalogView.css"
import { getAllBooks } from "../../api/books-api";
import BookTemplate from "../../components/book/BookTemplate";

const CatalogView = () => {
  const [books, setBooks ] = useState([]);

  useEffect(() => {
    const getBooks = async () => {
      const allBooks = await getAllBooks();
      setBooks(allBooks)
    }
    getBooks()
  },[])


  return (
    <>
      <main className="book-catalog" data-aos="fade-down">
       
        <div className="book-catalog-grid">
        {books.map((book) => {
          return <BookTemplate book={book} key={book._id}/>
        })}
        </div>
      </main>
    </>
  );
};

export default CatalogView;
