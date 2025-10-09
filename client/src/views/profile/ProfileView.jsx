import React, { useEffect, useState } from 'react'
import "./ProfileView.css"
import { getUserCredentials } from '../../api/user-api';
import ProfileBookTemplate from '../../components/profile-book/ProfileBookTemplate';
import { fetchBooksForShelf, getOneBook } from '../../api/books-api';
import BookTemplate from '../../components/book/BookTemplate';

const ProfileView = () => {

    //Functionalities: 
    // 1) [x] show user credentials 
    // 2) [x] show user library
    // 3) [] edit user info

    const [userCredentials, setUserCredentials] = useState({});

    const [userShelves, setUserShelves ] = useState({
        read: [],
        currReading: [],
        toRead: [],
    })

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
                read: readBooks,
                currReading: currReadingBooks,
                toRead: toReadBooks
            })

        })()

    },[])

    const renderBook = (bookArray) => {
       return  bookArray.map(book => <ProfileBookTemplate book = {book} key={book._id}/>)
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
    <button className="edit-btn">Edit Profile</button>
  </div>
  {/* ${editing ? html`
  <form className="edit-form" @submit=${onSaveEdit}>
    <input name="username" type="text" value="${user.username}" />
    <input name="profileImage" type="text" value="${user.profileImageUrl || ''}" placeholder="Image URL (optional)" />
    <div className="edit-actions">
      <button type="submit">Save</button>
      <button type="button" @click=${onCancelEdit}>Cancel</button>
    </div>
  </form>
` : null} */}

  <div className="profile-stats">
    <div><strong>{userShelves.read.length}</strong><span>Read</span></div>
    <div><strong>{userShelves.currReading.length}</strong><span>Currently Reading</span></div>
    <div><strong>{userShelves.toRead.length}</strong><span>To-Read</span></div>
  </div>
  <div className="book-shelf">
    <h3>Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.read)}
    </div>
    <h3>Currently Reading</h3>
    <div className="shelf-row">
      {renderBook(userShelves.currReading)}
    </div>
    <h3>To-Read</h3>
    <div className="shelf-row">
      {renderBook(userShelves.toRead)}
    </div>
  </div>
</section>
  )
}

export default ProfileView