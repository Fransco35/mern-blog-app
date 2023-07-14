# RiseBlog(mern-blog-app)

<img width="1277" alt="riseblog" src="https://github.com/Fransco35/mern-blog-app/assets/62514538/8018b71e-6b65-4315-a7b1-c0585fc351a8">

This is a fullstack blog application built with MERN stack (mongoDB, Express, React and Node.js). Visitors are able to read articles posted on the blog and also
signup or login to write articles. Only authenticed users are able to navigate to the Write page else they'll be redirected to the login page without authentication.
Each article can be fully accessed dynamically when the 'Read more' button is clicked and paginations is enacted to render only 10 articles per page.

## Features
### Frontend
- Page routing and dynamic page navigation using react-router-dom
- Authentication state management using React Context
- Pagination through custom hook
- Data fetching and posting with fetch API
- Side effects loading with useEffect and useCallback

### Backend
- Api endpoints and logic using express
- Image/File handling using multer and cloudinary middleware
- Authencation handling using passport
- Schema definition and chaining using mongoose
- Data fetching and storage in mongoDB

## Getting Started Locally
Run the following commands in your command line interface to get the project running in your local enviroment
- `git clone <repository https or ssh link>`
- `npm i (to install server packages)`
- `touch .env(to create a .env file and also paste you MONGO_URI, CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET and SECRET(for express sessions) details)`
- `cd client`
- `npm i (to install client packages)`
- `cd .. (to go back to the root directory)`
- `npm run dev (to startup the client and server concurrently )`

=== That's it, Happy Coding ===
