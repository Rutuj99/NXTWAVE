# Node JS Technical Assignment

## Overview

This project consists of two main components: a **client** and a **server**. The client is a React-based frontend application built using Vite, while the server is a Node.js backend application. The primary objective is to develop an engaging user interface that facilitates user login, registration, and displays account information effectively post-login.

## Project Structure

### Client

The client is a React application that uses Chakra UI for styling and Supabase for authentication. It also includes various other dependencies for state management, routing, and API calls.

#### Key Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A simple, modular, and accessible component library for React.
- **Supabase**: An open-source Firebase alternative for authentication and database management.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router DOM**: A library for routing in React applications.
- **Framer Motion**: A production-ready motion library for React.

#### Scripts

- `dev`: Starts the development server using Vite.
- `build`: Builds the project for production.
- `lint`: Runs ESLint to check for code quality issues.
- `preview`: Previews the production build locally.

### Server

The server is a Node.js application that handles user authentication, data storage, and other backend functionalities. It uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library.

#### Key Dependencies

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **Bcrypt**: A library for hashing passwords.
- **JSON Web Token (JWT)**: A library for creating and verifying JSON Web Tokens.
- **Nodemailer**: A module for sending emails from Node.js.
- **Nodemon**: A utility that automatically restarts the server upon file changes.

#### Scripts

- `dev`: Starts the development server using Nodemon.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (running locally or remotely)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install client dependencies**

   ```bash
   cd client
   npm install
   ```

3. **Install server dependencies**

   ```bash
   cd ../server
   npm install
   ```

### Configuration

1. **Client**

   - Create a `.env` file in the `client` directory and add the necessary environment variables (e.g., Supabase URL, Supabase API key).

   ```env
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

2. **Server**

   - Create a `.env` file in the `server` directory and add the necessary environment variables (e.g., MongoDB URI, JWT secret).

   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-jwt-secret
   ```

### Running the Application

1. **Start the server**

   ```bash
   cd server
   npm run dev
   ```

2. **Start the client**

   ```bash
   cd ../client
   npm run dev
   ```

3. **Access the application**

   - Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite).

## Features

- **User Registration**: Users can create a new account by providing necessary details.
- **User Login**: Registered users can log in using their credentials.
- **Account Information**: Post-login, users can view their account information.
- **Responsive Design**: The application is designed to be responsive and accessible on various devices.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgments

- **Vite**: For providing a fast and modern build tool.
- **Chakra UI**: For offering a simple and accessible component library.
- **Supabase**: For providing an open-source alternative to Firebase.
- **MongoDB**: For offering a flexible and scalable NoSQL database.

## Contact

For any questions or feedback, please reach out to [Your Name] at [Your Email Address].

---

This README provides a comprehensive guide to setting up, running, and understanding the project. Feel free to modify it as needed to better suit your project's requirements.