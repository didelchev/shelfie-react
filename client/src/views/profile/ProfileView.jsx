import React from 'react'
import "./ProfileView.css"

const ProfileView = () => {
  return (
    <section className="profile-page">
  <div className="profile-banner"></div>
  <div className="profile-card">
    <img src={null} alt="Profile Picture" />
    <div className="profile-details">
      <h2>John Doe</h2>
      <p className="email">jonhdoe@gmail.com</p>
      <p className="bio">Hello its me !</p>
    </div>
    <button className="edit-btn">Edit</button>
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
    {/* <div><strong>${books.filter(b => b.status === 'read').length}</strong><span>Read</span></div> */}
    {/* <div><strong>${books.filter(b => b.status === 'currReading').length}</strong><span>Currently Reading</span></div> */}
    {/* <div><strong>${books.filter(b => b.status === 'to-read').length}</strong><span>To-Read</span></div> */}
  </div>

  <div className="book-shelf">
    <h3>Read</h3>
    <div className="shelf-row">
      {/* ${books.filter(b => b.status === 'read').map(b => profileBooksTemplate(b,removeHandler))} */}
    </div>

    <h3>Currently Reading</h3>
    <div className="shelf-row">
      {/* ${books.filter(b => b.status === 'currReading').map(b => profileBooksTemplate(b,removeHandler))} */}
    </div>

    <h3>To-Read</h3>
    <div className="shelf-row">
      {/* ${books.filter(b => b.status === 'to-read').map(b => profileBooksTemplate(b,removeHandler))} */}
    </div>
  </div>
</section>
  )
}

export default ProfileView