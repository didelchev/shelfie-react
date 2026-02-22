import React, { useEffect, useState } from "react";
import {
  fetchBooksForShelf,
  getRecommendetBooks,
  removeBookFromShelf,
} from "../../api/books-api";
import { editUserCredentials, getUserCredentials } from "../../api/user-api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import "./ProfileView.css";
import DefaultNavbar from "../../components/navbar/DefaultNavbar";
import ProfileRecBook from "../../components/profile-book/ProfileRecBook";
import SpinnerComponent from "../../components/spinner/SpinnerComponent";

const STATUS_LABELS = {
  read: "Read",
  currReading: "Reading",
  toRead: "To Read",
};

const BookCard = ({ book, onRemove }) => {
  const handleRemoveClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    onRemove();
  };

  const badgeClass = `book-status-badge badge-${book.status}`;
  const badgeLabel = STATUS_LABELS[book.status] || book.status;

  return (
    <Link to={`/catalog/${book._id}`} state={{ book }} className="book-item">
      <div className="image-container">
        <img src={book.image} alt={book.title} />
      </div>
      <div className="book-desc">
        <div className="text-content">
          <h4>{book.title}</h4>
          <p>{book.author}</p>
          <span className={badgeClass}>{badgeLabel}</span>
        </div>
        <button
          className="remove-btn"
          onClick={handleRemoveClick}
          title="Remove from shelf"
        >
          ✖
        </button>
      </div>
    </Link>
  );
};

const ProfileView = () => {
  const [userCredentials, setUserCredentials] = useState({});
  const [editUser, setEditUser] = useState({
    username: "",
    profileImageUrl: "",
  });
  const [recommendedBooks, setRecommendetBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userShelves, setUserShelves] = useState({
    read: { books: [] },
    currReading: { books: [] },
    toRead: { books: [] },
  });
  const [isEditing, setIsEditing] = useState(false);
  const [activeShelf, setActiveShelf] = useState("all");

  useEffect(() => {
    (async () => {
      try {
        const user = await getUserCredentials();
        setUserCredentials(user);
        setEditUser({
          username: user.username,
          profileImageUrl: user.profileImageUrl,
        });

        const recBooks = await getRecommendetBooks(user._id);
        setRecommendetBooks(recBooks);

        const [readBooks, currReadingBooks, toReadBooks] = await Promise.all([
          fetchBooksForShelf(user.read),
          fetchBooksForShelf(user.currReading),
          fetchBooksForShelf(user.toRead),
        ]);

        setUserShelves({
          read: { books: readBooks.map((b) => ({ ...b, status: "read" })) },
          currReading: {
            books: currReadingBooks.map((b) => ({
              ...b,
              status: "currReading",
            })),
          },
          toRead: {
            books: toReadBooks.map((b) => ({ ...b, status: "toRead" })),
          },
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const getBooksToDisplay = () => {
    const { read, currReading, toRead } = userShelves;
    switch (activeShelf) {
      case "read":
        return read.books;
      case "currReading":
        return currReading.books;
      case "toRead":
        return toRead.books;
      default:
        return [...read.books, ...currReading.books, ...toRead.books];
    }
  };

  const removeBookHandler = async (bookId, shelfName) => {
    try {
      await removeBookFromShelf(bookId, shelfName);
      setUserShelves((prev) => ({
        ...prev,
        [shelfName]: {
          ...prev[shelfName],
          books: prev[shelfName].books.filter((b) => b._id !== bookId),
        },
      }));
      toast.success("Book removed from shelf.");
    } catch {
      toast.error("Failed to remove book.");
    }
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
      setIsEditing(false);
      toast.success("Profile updated successfully.");
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const totalBooks =
    userShelves.read.books.length +
    userShelves.currReading.books.length +
    userShelves.toRead.books.length;

  const booksToRender = getBooksToDisplay();

  const tabs = [
    { key: "all", label: "All Books", count: totalBooks },
    { key: "read", label: "Read", count: userShelves.read.books.length },
    {
      key: "currReading",
      label: "Currently Reading",
      count: userShelves.currReading.books.length,
    },
    { key: "toRead", label: "To Read", count: userShelves.toRead.books.length },
  ];

  if (isLoading) {
    return (
      <>
        <DefaultNavbar />
        <SpinnerComponent size={80} customCss={{ marginTop: "45vh" }} />
      </>
    );
  }

  return (
    <>
      <DefaultNavbar />
      <div className="profile-page">
        {/* ── HERO BANNER ── */}
        <div className="profile-hero">
          <div className="profile-hero-inner">
            <div className="profile-avatar-wrap">
              <img
                src={
                  userCredentials.profileImageUrl ||
                  "/images/default-avatar.png"
                }
                alt="avatar"
                className="profile-avatar"
              />
            </div>
            <div className="profile-hero-text">
              <h2>{userCredentials.username}</h2>
              <span>{userCredentials.email}</span>
              <div className="profile-stats-row">
                <div className="stat-chip">
                  <strong>{userShelves.read.books.length}</strong> Read
                </div>
                <div className="stat-chip">
                  <strong>{userShelves.currReading.books.length}</strong>{" "}
                  Reading
                </div>
                <div className="stat-chip">
                  <strong>{userShelves.toRead.books.length}</strong> To Read
                </div>
              </div>
              <button
                className="edit-btn"
                onClick={() => setIsEditing((p) => !p)}
              >
                ✏ {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>
        </div>

        {/* ── EDIT FORM ── */}
        {isEditing && (
          <div className="edit-form-wrap">
            <form onSubmit={submitHandler}>
              <h4>Edit Profile</h4>
              <input
                name="username"
                type="text"
                value={editUser.username}
                placeholder="Enter new username"
                onChange={(e) =>
                  setEditUser({ ...editUser, username: e.target.value })
                }
              />
              <input
                name="profileImageUrl"
                type="text"
                value={editUser.profileImageUrl}
                placeholder="Profile image URL (optional)"
                onChange={(e) =>
                  setEditUser({ ...editUser, profileImageUrl: e.target.value })
                }
              />
              <div className="edit-actions">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── SHELF FILTER TABS ── */}
        <div className="shelf-tabs-bar">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`shelf-tab ${activeShelf === tab.key ? "active" : ""}`}
              onClick={() => setActiveShelf(tab.key)}
            >
              {tab.label}
              <span className="tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        {/* ── CONTENT ── */}
        <div className="profile-content">
          {/* Books grid */}
          <div className="books-grid">
            {booksToRender.length > 0 ? (
              booksToRender.map((book) => (
                <BookCard
                  key={book._id}
                  book={book}
                  onRemove={() => removeBookHandler(book._id, book.status)}
                />
              ))
            ) : (
              <div className="empty-shelf">
                <span className="empty-icon">📚</span>
                <p>No books here yet. Start exploring the catalog!</p>
              </div>
            )}
          </div>

          {/* Recommendations sidebar */}
          {recommendedBooks.length > 0 && (
            <aside className="profile-sidebar">
              <div className="sidebar-card">
                <h4>Recommended for You</h4>
                <div className="recommended-books">
                  {recommendedBooks.map((book) => (
                    <ProfileRecBook book={book} key={book._id} />
                  ))}
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileView;
