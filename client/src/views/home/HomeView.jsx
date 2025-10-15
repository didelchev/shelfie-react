import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faWandMagicSparkles, faBookOpenReader, faStar } from "@fortawesome/free-solid-svg-icons";
import "./HomeView.css"
import { getAllBooks } from "../../api/books-api";
import BookTemplate from '../../components/book/BookTemplate'
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { ClipLoader } from "react-spinners";

const HomePage = () => {

  const [latestBooks, setLatestBooks ] = useState([])

  const { isAuthenticated } = useAuth;

  const [isLoading, setIsLoading] = useState(false);

  

  useEffect(() => {

    setIsLoading(true)

    const getBooks = async () => {
      try {
        const books = await getAllBooks();

        setLatestBooks(books.slice(-6))

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
              <h1>Welcome to Shelfie</h1>
              <h2>
                Dive into a world of books. Organize your collection and find
                new reads.
              </h2>
              {!isAuthenticated ? (
                <div className="action-buttons">
                  <Link to={"/login"}>Login</Link>
                  <Link to={"/register"}>Register</Link>
                </div>
              ) : null}
            </div>
            <div className="book-stack-wrapper">
              <div className="book-stack">
                <img
                  src="/images/book1.webp"
                  className="book book-1"
                  alt="Book 1"
                />
                <img
                  src="/images/book2.webp"
                  className="book book-2"
                  alt="Book 2"
                />
                <img
                  src="/images/book3.webp"
                  className="book book-3"
                  alt="Book 3"
                />
                <img
                  src="/images/book4.webp"
                  className="book book-4"
                  alt="Book 4"
                />
                <img
                  src="/images/book5.webp"
                  className="book book-5"
                  alt="Book 5"
                />
              </div>
            </div>
          </section>

          <div
            className="features-grid-container"
            data-aos="fade"
            data-aos-delay="100"
            data-aos-duration="1000"
          >
            <div className="feature-item">
              <div className="circle-border">
                <FontAwesomeIcon icon={faSearch} size="3x" />
              </div>
              <h3>Search & Filter</h3>
              <p>
                Quickly find the books you’re looking for with powerful search
                and filter tools. Browse your personal shelves by title, author,
                or genre, and sort results to match your reading mood. Whether
                your library is small or growing fast, finding the right book is
                always just a few clicks away.
              </p>
            </div>

            <div className="feature-item">
              <div className="circle-border">
                <FontAwesomeIcon icon={faWandMagicSparkles} size="3x" />
              </div>
              <h3>Personalized Book Recommendations</h3>
              <p>
                Discover your next great read with recommendations tailored to
                your taste. Based on the books you've rated and added to your
                shelves, Shelfie suggests titles you’re likely to enjoy. The
                more you interact with books, the smarter your recommendations
                get—helping you explore new stories that match your interests.
              </p>
            </div>

            <div className="feature-item">
              <div className="circle-border">
                <FontAwesomeIcon icon={faBookOpenReader} size="3x" />
              </div>
              <h3>Reading Progress Tracker</h3>
              <p>
                Track your personal reading journey by adding books to your
                custom shelves. Organize your collection the way you
                like—whether it's “Want to Read,” “Currently Reading,” or
                “Finished.” Rate and comment on books to share your thoughts and
                keep a record of what you’ve read. Simple and personal, it’s
                your bookshelf, your way.
              </p>
            </div>
          </div>

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
                  Shelfie isn’t just a tracker—it’s a celebration of your
                  reading journey. Imagine a space where every book you’ve
                  loved, every story that changed you, and every future
                  adventure you’re dreaming of lives together in perfect
                  harmony.
                  <br />
                  <br />
                  Whether you're a casual reader or a lifelong book lover,
                  Shelfie gives you the tools to stay organized, inspired, and
                  connected to your reading life. Add books to personalized
                  shelves, leave your thoughts with ratings and comments, and
                  receive recommendations that truly reflect your unique tastes.
                  It’s more than just keeping track—it’s about building a
                  digital home for the stories that shape you.
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
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "I’ve bounced between spreadsheets, notes apps, and other
                  reading trackers, but nothing felt right until I found
                  Shelfie. The design is calm and thoughtful, and for once, I’m
                  not overwhelmed by features I don’t need. It gives me just
                  enough flexibility to reflect my reading habits — organizing
                  by mood, logging thoughts mid-book, and celebrating books I
                  re-read without judgment. It’s intuitive, it’s comforting, and
                  it makes me feel more connected to my books. I didn’t know I
                  needed an app like this until I used it."
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
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "After a decade of using every book tracking app imaginable, I
                  was about to give up hope of ever finding one that truly
                  understood readers. Then I discovered Shelfie, and it was like
                  finding a kindred spirit in app form. The attention to detail
                  shows the developers genuinely care about books - from the way
                  you can organize by mood and not just genre, to the thoughtful
                  reading progress tracker that doesn't make you feel guilty for
                  taking your time."
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture3.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "Shelfie has brought a quiet joy back into my reading life. I
                  used to feel guilty about unread books or half-finished
                  stories, but this app reframes the experience — making it okay
                  to pause, revisit, or simply enjoy a book slowly. I love that
                  I can sort books by how they made me feel, not just by genre
                  or rating. It's not just practical; it's personal, and that’s
                  why I recommend it to every reader I know."
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
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "Using Shelfie feels like having a librarian friend in your
                  pocket. The attention to detail — from tracking my favorite
                  quotes to gently reminding me where I left off — is subtle but
                  powerful. I’ve rediscovered books I’d forgotten about and
                  started keeping better notes on how each book made me feel.
                  For the first time, my reading app feels like part of the
                  experience, not just a place to log titles."
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture5.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <blockquote className="testimonial-quote">
                  "Shelfie quickly became more than just a book tracker — it
                  became part of my reading ritual. I log my progress every
                  night, add little reflections, and even browse past reads to
                  find comfort in stories I’ve loved. It’s rare to find an app
                  that feels human, but Shelfie genuinely does. It doesn't
                  pressure me to read faster or compete with others. Instead, it
                  helps me stay in love with reading, and that means
                  everything.”"
                </blockquote>
                <div className="testimonial-author">
                  <img
                    src="/images/profile-picture6.webp"
                    alt="Profile Picture"
                  />
                  <h5>John Doe</h5>
                </div>
              </div>
              <div className="testimonial-item">
                <div className="star-wrapper">
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                  <FontAwesomeIcon icon={faStar} color="gold" />
                </div>
                <blockquote className="testimonial-quote">
                  "What I love most about Shelfie is how it respects the way
                  each person reads. Some days I fly through a book, others I
                  pause for weeks — and this app doesn’t judge. It lets me
                  organize my collection in a way that makes sense to me,
                  whether that’s mood-based, seasonal, or something entirely
                  personal. It feels like the developers truly understand that
                  reading is an emotional experience, not just a checklist."
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
