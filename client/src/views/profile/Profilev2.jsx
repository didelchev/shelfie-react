import React, { useEffect, useState } from 'react'
import { fetchBooksForShelf, getOneBook, removeBookFromShelf } from '../../api/books-api';
import { editUserCredentials, getUserCredentials } from '../../api/user-api';
import { toast } from "react-toastify";

import ProfileBookTemplate from '../../components/profile-book/ProfileBookTemplate';


import "./Profilev2.css"
import DefaultNavbar from '../../components/navbar/DefaultNavbar';
import ProfileBookTemplatev2 from '../../components/profile-book/ProfileBookTemplatev2';

const Profilev2 = () => {

    const [userCredentials, setUserCredentials] = useState({});

    const [editUser, setEditUser ] = useState({
      username: "",
      profileImageUrl: ""

    });

    const [userShelves, setUserShelves ] = useState({
        read: [],
        currReading: [],
        toRead: [],
    })

    const [isEditing, setIsEditing] = useState(false);


    const [ activeShelf, setActiveShelf] = useState('all');


    useEffect(() => {
        (async () => {
            const user = await getUserCredentials();

            setUserCredentials(user)

              const [readBooks, currReadingBooks, toReadBooks] = await Promise.all([
                    fetchBooksForShelf(user.read),
                    fetchBooksForShelf(user.currReading),
                    fetchBooksForShelf(user.toRead),
                ]);

            setUserShelves({
                read: { books: readBooks, status: 'read'} ,
                currReading: {books :currReadingBooks, status: 'currReading'},
                toRead: {books: toReadBooks, status: 'to-read'}
            })

        })()


    },[])

    
    const handleShelfFilter = (shelfName) => {
      setActiveShelf(shelfName)
    }

    const showEditFormHandler = () => {
      setIsEditing(prevState => !prevState)
    }

    const editHandler = ( e ) => {
      setEditUser({...editUser, [e.target.name] : e.target.value})
      
    }

    const submitHandler = async (e) => {
      e.preventDefault();
      
      try {
        const { username, profileImageUrl } = editUser;

        const newUserData = await editUserCredentials({ username, profileImageUrl})

        setUserCredentials(newUserData.user)



      } catch (error) {
          console.log(error)
      }

    }

    const removeBookHandler = async (bookId, shelfName) => {

        try {
          await removeBookFromShelf(bookId, shelfName)

          setUserShelves(prevShelves => ({
            ...prevShelves,
            [shelfName]: {
                ...prevShelves[shelfName],
                books: prevShelves[shelfName].books.filter(book => book._id !== bookId)
            }
        }))

          toast.success('Book has been removed successfully from shelf !')      
        } catch (error) {
          toast.error('Failed to remove book !')
          console.error("Failed to remove book:", error);
        }


      }


    const getBooksToDisplay = () => {
        const readBooks = userShelves.read?.books || [];
        const currReadingBooks = userShelves.currReading?.books || [];
        const toReadBooks = userShelves.toRead?.books || [];
    
    switch (activeShelf) {
        case 'read':
            return readBooks;
        case 'currReading':
            return currReadingBooks;
        case 'toRead':
            return toReadBooks;
        case 'all':
        default:
            return [
                ...readBooks,
                ...currReadingBooks,
                ...toReadBooks,
            ];
    }
};

    const booksToRender = getBooksToDisplay();


    const renderBookCards = (bookArray) => {
      return bookArray?.map(book => {
        const shelfName = book.status


        return (
          <ProfileBookTemplatev2 
            book={book}
            key={book._id}
            // onRemove={removeBookHandler(book._id, book.status)}
          />
        )
      })
    }

    
  return (
    <>
        <DefaultNavbar />
        <section className='profile-page-wrapper'>
        <section className='profile-left-section'>
            <div className="profile-info">
                <img src="/images/profile-picture.webp" alt="avatar" className='profile-image'/>
                <h3>John Doe</h3>
            </div>
            <div className="profile-stats">
              <span>Read: 4</span>
              <span>Reading: 2</span>
              <span>To-Read: 5</span>
            </div>
            <div className="book-shelves">
              <h5>My Books</h5>
              <button onClick={() => handleShelfFilter('all')}>All Books</button>
              <button onClick={() => handleShelfFilter('read')} >Read</button>
              <button onClick={() => handleShelfFilter('currReading')} >Currently Reading</button>
              <button onClick={() => handleShelfFilter('toRead')} >To Read</button>
            </div>
        </section>
        <section className='profile-right-section'>
          {renderBookCards(booksToRender)}
        </section>

    </section>
    </>
    
  )
}

export default Profilev2