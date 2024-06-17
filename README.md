# Simple Social Media Web App name BeSocial

Welcome to the my Simple Social Media Web App! This project is a basic implementation of a social media platform where users can create posts, delete their posts, comment on posts and comments, and like or dislike posts and comments.

## Features

- **User Authentication**: Sign up and log in to the application.
- **Create Post**: Users can create new posts.
- **Delete Post**: Users can delete their own posts.
- **Comment**: Users can comment on posts and other comments.
- **Delete Comment**: User can delete comments that is created by them or on their post.
- **Like/Dislike**: Users can like or dislike posts and comments.

## Upcoming Features:

- **Social Authentication**: Authentication using google
- **Notifications**: on creation of post or comment a notification will be shown.
- **Parallel mailers**: mailing features will enables us to communicate with our users.
- **Delayed Jobs handling**: using kue and Redis delayed jobs will be handled.

## Technologies Used

- **Frontend**: HTML, CSS, Java Script (React comming soon)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/social-media-web-app.git
    cd social-media-web-app
    ```

2. **Install Backend dependencies**:

- [connect-flash](https://www.npmjs.com/package/connect-flash): Middleware for flashing messages
- [connect-mongo](https://www.npmjs.com/package/connect-mongo): MongoDB session store for Connect and Express
- [cookie-parser](https://www.npmjs.com/package/cookie-parser): Parse HTTP request cookies
- [ejs](https://www.npmjs.com/package/ejs): Embedded JavaScript templating
- [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js
- [express-session](https://www.npmjs.com/package/express-session): Session middleware for Express
- [fs](https://www.npmjs.com/package/fs): File system operations
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): JSON Web Token implementation
- [mongoose](https://www.npmjs.com/package/mongoose): Elegant MongoDB object modeling for Node.js
- [multer](https://www.npmjs.com/package/multer): Middleware for handling `multipart/form-data`
- [node-sass-middleware](https://www.npmjs.com/package/node-sass-middleware): Middleware for Node.js that allows for on-the-fly conversion of SASS/SCSS files
- [passport](https://www.npmjs.com/package/passport): Simple, unobtrusive authentication for Node.js
- [passport-jwt](https://www.npmjs.com/package/passport-jwt): Passport strategy for authenticating with a JSON Web Token
- [passport-local](https://www.npmjs.com/package/passport-local): Passport strategy for authenticating with a username and password

 3. **Install Frontend dependencies**:

- HTML, CSS, JavaScript (Vanilla JS for now, React planned)
    ```

4. **Set up environment variables**:
    Create a `.env` file in the `backend` directory and add your MongoDB connection string and other environment variables as needed:
    ```
    MONGO_URI=your_mongo_db_connection_string
    JWT_SECRET=your_secret_key
    ```

5. **Run the backend server**:


6. **Run the frontend server**:


The app should now be running on `http://localhost:3000`.

## Usage

1. **Sign Up**: Create a new account or log in if you already have an account.
2. **Create Post**: Navigate to the home page and create a new post.
3. **Interact**: Like, dislike, and comment on posts and comments.
4. **Manage Posts**: Delete your own posts if needed.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. **Fork the repository**.
2. **Create a new branch** for your feature or bug fix:
    ```bash
    git checkout -b feature-or-bugfix-name
    ```
3. **Commit your changes**:
    ```bash
    git commit -m 'Description of the feature or fix'
    ```
4. **Push to the branch**:
    ```bash
    git push origin feature-or-bugfix-name
    ```
5. **Create a pull request** on GitHub.


## Contact

For any inquiries or feedback, feel free to reach out at kanhaiya2004yadav@gmail.com.

---

Thank you for checking out this project! Happy coding!
