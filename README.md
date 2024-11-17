
# MERN Chat App

A real-time chat application built using the MERN stack (MongoDB, Express, React, Node.js). The application supports user authentication and real-time messaging.

## Features

- **Real-time Messaging**: Instant communication using Socket.IO.
- **User Authentication**: Secure login and registration with JWT and bcrypt.
- **Responsive Frontend**: Built with React and React Router.
- **Database**: MongoDB for storing users and messages.
- **Environment Configuration**: Managed using dotenv.

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express
- MongoDB (via Mongoose)
- Socket.IO
- JWT for authentication
- Bcrypt for password hashing

## Installation

### Prerequisites
- Node.js installed
- MongoDB instance running locally or in the cloud

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. Install dependencies for both frontend and backend:
   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. Create `.env` files:
   - Frontend (`client/.env`): Configure environment variables as needed.
   - Backend (`server/.env`): Add the following variables:
     ```env
     PORT=5000
     MONGO_URI=<your_mongodb_connection_string>
     JWT_SECRET=<your_jwt_secret>
     ```

4. Start the development servers:
   ```bash
   # Start the backend
   cd server
   npm run server

   # Start the frontend
   cd ../client
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

## Project Structure

### Frontend (React)
- **`/src`**
  - **`components`**: React components for Login, Chat, etc.
  - **`App.js`**: Main application entry point.

### Backend (Node.js)
- **`server.js`**: Main server file.
- **`config`**: Database configuration.
- **`controllers`**: Business logic for authentication and chats.
- **`models`**: Mongoose models for User and Message.
- **`routes`**: Express routes for APIs.

## Scripts

### Frontend
- `npm start`: Runs the React application in development mode.
- `npm build`: Builds the application for production.

### Backend
- `npm run server`: Starts the backend in development mode with Nodemon.
- `npm start`: Runs the backend server.

## License

This project is licensed under the MIT License.
