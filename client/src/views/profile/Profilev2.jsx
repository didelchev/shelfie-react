import React, { useEffect, useState } from 'react'
import { fetchBooksForShelf, getOneBook, removeBookFromShelf } from '../../api/books-api';
import { editUserCredentials, getUserCredentials } from '../../api/user-api';
import { toast } from "react-toastify";

import ProfileBookTemplate from '../../components/profile-book/ProfileBookTemplate';


import "./Profilev2.css"
import DefaultNavbar from '../../components/navbar/DefaultNavbar';

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

    const renderBook = (bookArray, shelfName) => {
      
       return  bookArray?.map(book => 
       <ProfileBookTemplate book={book} key={book._id} onRemove={( ) => removeBookHandler(book._id, shelfName)}/>
      )
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


    

    
  return (
    <>
        <DefaultNavbar />
        <section className='profile-page-wrapper'>
        <section className='profile-left-section'>
            <div className="profile-info">
                <img src="/images/profile-picture.webp" alt="avatar" className='profile-image'/>
                <h3>John Doe</h3>
            </div>
            <div className="book-shelves">

            </div>
        </section>
        <section className='profile-right-section'>
            <div className="left-column">
                <div className="book-item">
                    <div className="image-container">
                        <img src="" alt="" />
                    </div>
                    <div className="book-desc">
                        <h4>Book Title</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur facere vero hic laborum quae commodi nisi. Tempore exercitationem officia veritatis?</p>
                    </div>
                </div>
                <div className="book-item"></div>
                <div className="book-item"></div>
            </div>
            <div className="right-column">
                <div className="book-item"></div>
                <div className="book-item"></div>
                <div className="book-item"></div>
            </div>
        </section>

    </section>
    </>
    
  )
}

export default Profilev2