import React, { useEffect, useState } from 'react'
import { fetchBooksForShelf, getOneBook, removeBookFromShelf } from '../../api/books-api';
import { editUserCredentials, getUserCredentials } from '../../api/user-api';
import { toast } from "react-toastify";

import ProfileBookTemplate from '../../components/profile-book/ProfileBookTemplate';


const ProfileView = () => {

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
<section className="profile-page">
  <div className="profile-banner"></div>
  <div className="profile-card">
    <img src={userCredentials.profileImageUrl} alt="Profile Picture" />
    <div className="profile-details">
      <h2>{userCredentials.username}</h2>
      <p className="email">{userCredentials.email}</p>
      <p className="bio"></p>
    </div>
    <button className="edit-btn" onClick={showEditFormHandler}>Edit Profile</button>
  </div>

  {isEditing ? (
  <form className="edit-form" onSubmit={submitHandler}>
    <input name="username" type="text" value={editUser.username} placeholder="Enter new username" onChange={editHandler}/>
    <input name="profileImageUrl" type="text" value={editUser.profileImageUrl} placeholder="Image URL (optional)" onChange={editHandler} />
    <div className="edit-actions">
      <button type="submit">Save</button>
      <button type="button" onClick={showEditFormHandler}>Cancel</button>
    </div>
  </form>
  ): null}

  <div className="profile-stats">
    <div><strong>{userShelves.read.books.length}</strong><span>Read</span></div>
    <div><strong>{userShelves.currReading.books.length}</strong><span>Currently Reading</span></div>
    <div><strong>{userShelves.toRead.books.length}</strong><span>To-Read</span></div>
  </div>
  <div className="book-shelf">
    <h3>Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.read.books, userShelves.read.status)}
    </div>
    <h3>Currently Reading</h3>
    <div className="shelf-row">
      {renderBook(userShelves.currReading.books, userShelves.currReading.status)}
    </div>
    <h3>To-Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.toRead.books, userShelves.toRead.status)}
    </div>
  </div>
</section>
  )
}

export default ProfileView