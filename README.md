#  Shelfie (React Version)
![Project Screenshot](/client/public/images/welcome-image-react.png)

##  Description
**Shelfie** is a minimalist book catalog web app inspired by Goodreads — rebuilt entirely using **React**.  
This version is a React-based reconstruction of the **original Shelfie app**, which was developed with 
**JavaScript, Lit, HTML, and CSS**.  
By rebuilding it in React, I aimed to improve the app’s scalability, code organization, and user experience through reusable components, dynamic routing, and state management.

>  You can check out the original JavaScript version of Shelfie here:  
> [Shelfie (JS Version)](https://github.com/didelchev/shelfie-book-app)

The app provides a clean, responsive interface for browsing books, managing your library, and tracking your reading journey.


##  Deployment
**Live Demo:** [https://shelfie-book-app.netlify.app/](https://shelfie-book-app.netlify.app/)

**Demo Credentials:**
- **Email:** johndoe@gmail.com  
- **Password:** 1234  


## Technologies Used
* React
* Express.js
* MongoDB Atlas
* Netlify (Frontend Deployment)
* Render (Backend Deployment)

## Features
* Authentication – Register, login, and persist user sessions
* Book Catalog – Browse all books with search and filter options
* Single Book Page – View details, add books to your library, and manage categories
* User Profile – View user info, book statistics, and categorized book lists
* Responsive Design – Works smoothly across devices

# Planning 
I Started the project by drawing a wireframe on Excalidraw. The app consists of the following pages:

* Login: Allows users to log in to their accounts.
* Register: Enables users to create new account.
* Browse Books: Displays a book catalog with the filter options to di
* Single Book: Shows detailed information about a specific book. Users can add books to their library by clicking the "Add to Library" button and categorize them as "Read," "Currently Reading," or "Wishlist." If a book is already in the library, the user can view its current category instead of the default "Add to Library" button.
* Profile Page: Allows logged-in users to see their profile, with their profile image, bio, their book stats. They can also view all the books they have added to a specific category (Read, Currently Reading, To-Read)

![Project Screenshot](/client/public/images/login-register-wireframe.png)
![Project Screenshot](/client/public/images/wireframes.png)



## Build Process 
1) Initial Layout – Started with the basic design using only HTML and CSS, focusing on structure and styling before adding any JavaScript.

2) Backend & Database Setup – Built the Express.js server and connected it to a MongoDB Atlas database to handle data storage and retrieval.

3) Frontend Functionality – Returned to the frontend to implement:
    * Authentication: Login and registration system
    * Catalog Page: Displayed books with filtering and search capabilities
    * Single Book Page: Showed detailed information, ratings, and comments
    * Profile Page: User-specific data and settings

4) Polish & Responsiveness – Refined the design, improved usability, and ensured the layout was fully responsive across devices.

5) Deployed the backend on vercel.com and the frontend on netlify.com

## Future Improvements

* Enable editing and deleting of comments
* Implement infinite scroll or pagination for large book lists
* Introduce dark/light theme toggle
* Add reading progress tracking
