import React, { useEffect, useState } from "react";
import {
  fetchBooksForShelf,
  getOneBook,
  getRecommendetBooks,
  removeBookFromShelf,
} from "../../api/books-api";
import { editUserCredentials, getUserCredentials } from "../../api/user-api";
import { toast } from "react-toastify";


import "./Profilev2.css";
import DefaultNavbar from "../../components/navbar/DefaultNavbar";
import ProfileBookTemplatev2 from "../../components/profile-book/ProfileBookTemplatev2";
import ProfileRecBook from "../../components/profile-book/ProfileRecBook";

const Profilev2 = () => {
  const [userCredentials, setUserCredentials] = useState({});

  const [editUser, setEditUser] = useState({
    username: "",
    profileImageUrl: "",
  });

  const [recommendedBooks, setRecommendetBooks] = useState([]);

  const [userShelves, setUserShelves ] = useState({
    read: { books: []}, 
    currReading: {books :[]},
    toRead: {books: [] }
});

  const [isEditing, setIsEditing] = useState(false);

  const [activeShelf, setActiveShelf] = useState("all");

  useEffect(() => {
    (async () => {
      const user = await getUserCredentials();

      setUserCredentials(user);

      const recBooks = await getRecommendetBooks(user._id);

      setRecommendetBooks(recBooks)

      const [readBooks, currReadingBooks, toReadBooks] = await Promise.all([
        fetchBooksForShelf(user.read),
        fetchBooksForShelf(user.currReading),
        fetchBooksForShelf(user.toRead),
      ]);

      const readBooksWithStatus = readBooks.map(book => ({ ...book, status: 'read' }));
      const currReadingBooksWithStatus = currReadingBooks.map(book => ({ ...book, status: 'currReading' }));
      const toReadBooksWithStatus = toReadBooks.map(book => ({ ...book, status: 'toRead' }));

      setUserShelves({
        read: { books: readBooksWithStatus },
        currReading: { books: currReadingBooksWithStatus},
        toRead: { books: toReadBooksWithStatus },
      });
    })();
  }, []);




  const filterHandler = (shelfName) => {
    setActiveShelf(shelfName);
  };

  const showEditFormHandler = () => {
    setIsEditing((prevState) => !prevState);
  };

  const editHandler = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { username, profileImageUrl } = editUser;

      const newUserData = await editUserCredentials({
        username,
        profileImageUrl,
      });

      setUserCredentials(newUserData.user);
    } catch (error) {
      console.log(error);
    }
  };

  const removeBookHandler = async ( bookId, shelfName) => {
    console.log(shelfName)
    try {
      await removeBookFromShelf(bookId, shelfName);

      setUserShelves((prevShelves) => ({
        ...prevShelves,
        [shelfName]: {
          ...prevShelves[shelfName],
          books: prevShelves[shelfName].books.filter(
            (book) => book._id !== bookId
          ),
        },
      }));

      toast.success("Book has been removed successfully from shelf !");
    } catch (error) {
      toast.error("Failed to remove book !");
      console.error("Failed to remove book:", error);
    }
  };

  const getBooksToDisplay = () => {
    const readBooks = userShelves.read?.books || [];
    const currReadingBooks = userShelves.currReading?.books || [];
    const toReadBooks = userShelves.toRead?.books || [];

    switch (activeShelf) {
      case "read":
        return readBooks;
      case "currReading":
        return currReadingBooks;
      case "toRead":
        return toReadBooks;
      case "all":
      default:
        return [...readBooks, ...currReadingBooks, ...toReadBooks];
    }
  };

  const booksToRender = getBooksToDisplay();

  const renderBookCards = (bookArray) => {    
    return bookArray?.map((book) => {
      return (
        <ProfileBookTemplatev2
          book={book}
          key={book._id}
          onRemove={() => removeBookHandler(book._id, book.status)}
        />
      );
    });
  };

  return (
    <>
      <DefaultNavbar />
      <section className="profile-page-wrapper">
        <section className="profile-left-section">
          <div className="profile-info">
            <img
              src={userCredentials.profileImageUrl}
              alt="avatar"
              className="profile-image"
            />
            <h3>{userCredentials.username}</h3>
            <h5>{userCredentials.email}</h5>
            
          </div>
          <div className="book-shelves">
            <h5>My Books</h5>
            <button 
              onClick={() => filterHandler("all")}
              className={activeShelf === "all" ? "active-shelf" : ""}
            >
              All Books
            </button>
        
            <button 
              onClick={() => filterHandler("read")}
              className={activeShelf === "read" ? "active-shelf" : ""}
            >
              Read
            </button>
            <button 
              onClick={() => filterHandler("currReading")}
              className={activeShelf === "currReading" ? "active-shelf" : ""}
            >
              Currently Reading
            </button>
            <button 
              onClick={() => filterHandler("toRead")}
              className={activeShelf === "toRead" ? "active-shelf" : ""}
            >
              To Read
            </button>
          </div>
        </section>
        <section className="profile-right-section">
          {renderBookCards(booksToRender)}
        </section>
        <section className="profile-end-section">
          <h4>Reading Stats</h4>
          <div className="profile-stats">
            <div className="stat-item">
              <strong>{userShelves.read.books?.length}</strong>
              <span>Read</span>
            </div>
            <div className="stat-item">
              <strong>{userShelves.currReading.books?.length}</strong>
              <span>Currently Reading</span>
            </div>
            <div className="stat-item">
              <strong>{userShelves.toRead.books?.length}</strong>
              <span>To Read</span>
            </div>
          </div>
          <div className="recommended-section">
            <h4>Recommended Books</h4>
            <div className="recommended-books">
                {recommendedBooks.map(book => {
                  return <ProfileRecBook book={book} key={book._id}/> 
                })}
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Profilev2;
