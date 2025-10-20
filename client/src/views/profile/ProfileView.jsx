import React, { useEffect, useState } from 'react'
import { fetchBooksForShelf, getOneBook } from '../../api/books-api';
import { editUserCredentials, getUserCredentials } from '../../api/user-api';

import ProfileBookTemplate from '../../components/profile-book/ProfileBookTemplate';

import "./ProfileView.css"

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

    const renderBook = (bookArray) => {
       return  bookArray?.map(book => <ProfileBookTemplate book = {book} key={book._id}/>)
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

      

      const removeBookHandler = (bookId) => {

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
    <div><strong>{userShelves.read.length}</strong><span>Read</span></div>
    <div><strong>{userShelves.currReading.length}</strong><span>Currently Reading</span></div>
    <div><strong>{userShelves.toRead.length}</strong><span>To-Read</span></div>
  </div>
  <div className="book-shelf">
    <h3>Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.read.books)}
    </div>
    <h3>Currently Reading</h3>
    <div className="shelf-row">
      {renderBook(userShelves.currReading.books)}
    </div>
    <h3>To-Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.toRead.books)}
    </div>
  </div>
</section>
  )
}

export default ProfileView