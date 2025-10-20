import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faWandMagicSparkles, faBookOpenReader, faStar } from "@fortawesome/free-solid-svg-icons";
import "./HomeView.css"
import { getAllBooks } from "../../api/books-api";
import BookTemplate from '../../components/book/BookTemplate'
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";
import screenshot from '../../../public/images/shelfie-catalog-img.png'

const HomePage = () => {

  const [latestBooks, setLatestBooks ] = useState([])

  const  isAuthenticated  = useAuth();
  

  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {

    setIsLoading(true)

    const getBooks = async () => {
      try {
        const books = await getAllBooks();

        setLatestBooks(books.slice(-5))

        setIsLoading(false)

      } catch (error) {
        
        console.log(error)

        setIsLoading(false)
      }
    }
    getBooks();
  },[])


  return (
    <>
      {isLoading ? (
        <ClipLoader />
      ) : (
        <>
          <section className="main-content" data-aos="fade-right">
            <div className="welcome-text">
              <h1>Shelfie</h1>
              <h2>Discover Your Next Great Read,<br/>Organize Your Library </h2>
              {!isAuthenticated ? (
                <div className="action-buttons">
                  <Link to={"/register"}>Sign Up</Link>
                  <Link to={"/login"}>Sign In</Link>
                </div>
              ) : null}
            </div>
            <div className="welcome-image">
            </div>
          </section>
          <section className="app-info">
            <h3>We'll help you <strong>track your reading</strong> and <strong>choose your next book</strong> based on your favorite topics and genres. </h3>
          </section>

          <section className="discover-books">
            <div className="discover-description">
              <h3 >Discover books</h3>
              <p>Use our powerful search and filtering tools to effortlessly explore thousands of titles.<br></br>
              <br></br>
               Filter by <strong>genre, rating, or author</strong> to quickly connect with the stories and knowledge that perfectly match your current mood and literary tastes.</p>
            </div>
            <div className="discover-image">
              <img src={screenshot} alt="" />
            </div>
          </section>

          <section
            className="about-app-container"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <div className="about-image">
              <img
                src="/images/example5.webp"
                alt="Organized books with Shelfie"
              />
            </div>
            <div className="about-description">
              <div className="about-text-wrapper">
                <h1>More Than a Bookshelf</h1>
                <p>
                  Shelfie is the ultimate digital home for your reading journey. It's more than a tracker, it's a celebration of every book you've loved and every story you dream of reading.
                  <br></br>
                  <br></br>
                  Whether you're a casual or lifelong book lover, Shelfie keeps you organized and inspired. Add books to personalized shelves, share your thoughts with ratings and comments, and receive recommendations that truly reflect your tastes.

                </p>
              </div>
              <div className="action-buttons">
                <Link to={"/catalog"}>Start Exploring</Link>
              </div>
            </div>
          </section>

          <section
            className="testimonials"
            data-aos="fade"
            data-aos-duration="500"
          >
            <div className="divider">
              <span>What Our Users Says</span>
            </div>
            <div className="testimonials-grid-container">
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "I’ve bounced between spreadsheets, notes apps, and other
                  reading trackers, but nothing felt right until I found
                  Shelfie. The design is calm and thoughtful, and for once, I’m
                  not overwhelmed by features I don’t need."
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture2.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "Shelfie has brought a quiet joy back into my reading life. I
                  used to feel guilty about unread books or half-finished
                  stories, but this app reframes the experience — making it okay
                  to pause, revisit, or simply enjoy a book slowly. 
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture4.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                  <FontAwesomeIcon icon={faStar} color="#ca6d1b" />
                </div>
                <blockquote className="testimonial-quote">
                  "What I love most about Shelfie is how it respects the way
                  each person reads. Some days I fly through a book, others I
                  pause for weeks — and this app doesn’t judge. It lets me
                  organize my collection in a way that makes sense to me,
                  whether that’s mood-based, seasonal, or something entirely
                  personal."
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
            </div>
          </section>




          <section className="popular-books" data-aos="fade-down">
            <div className="divider">
              <span>Recently Added Books</span>
            </div>
            <div className="popular-books-grid">
              {latestBooks.map((book, index) => (
                <BookTemplate key={index} book={book} />
              ))}
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HomePage;
