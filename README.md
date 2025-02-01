# Node JS Technical Assignment

## Overview

This project consists of two main components: a **client** and a **server**. The client is a React-based frontend application built using Vite, while the server is a Node.js backend application. The primary objective is to develop an engaging user interface that facilitates user login, registration, and displays account information effectively post-login.

## Project Structure

### Client

The client is a React application that uses Chakra UI for styling and Supabase to store images. It also includes various other dependencies for state management, routing, and API calls.

#### Key Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Chakra UI**: A simple, modular, and accessible component library for React.
- **Supabase**: An open-source Firebase for image storing and getting the global link of images.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Router DOM**: A library for routing in React applications.



### Server

The server is a Node.js application that handles user authentication, data storage, and other backend functionalities. It uses MongoDB as the database and Mongoose as the ODM (Object Data Modeling) library.

#### Key Dependencies

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: An ODM library for MongoDB and Node.js.
- **Bcrypt**: A library for hashing passwords.
- **Nodemailer**: A module for sending emails from Node.js.
- **Nodemon**: A utility that automatically restarts the server upon file changes.

## Getting Started
- deployed Link "https://remarkable-lokum-d441be.netlify.app/"

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)
- MongoDB (running locally or remotely)

### Images 
![image](https://github.com/user-attachments/assets/d304c80b-a0a3-4876-970a-6304201ccf53)
![image](https://github.com/user-attachments/assets/2f61a075-43fd-4345-9995-f2b21a76a2d5)
![image](https://github.com/user-attachments/assets/8f0e2c2a-d366-4b36-b07b-05d5e16fa2b0)
![image](https://github.com/user-attachments/assets/e2081bd0-814a-407b-a593-1d7c57fbcd6a)
![image](https://github.com/user-attachments/assets/0b3d99a4-6431-412d-b4fd-d6a10550acdd)
![image](https://github.com/user-attachments/assets/7033ca10-c547-4196-b921-ecb5cf7a7ebb)
![image](https://github.com/user-attachments/assets/aef24bab-d03f-4052-a2e8-162a6761a52d)
![image](https://github.com/user-attachments/assets/ffce8b40-afad-4c25-8b26-5b66353a81a9)
![image](https://github.com/user-attachments/assets/24c30caf-4211-4cc8-a0e6-5c630dca210b)
![image](https://github.com/user-attachments/assets/25d26037-cc7e-4506-a448-277e9d0af9e2)









## Features

- **User Registration**: Users can create a new account by providing the required details.

- **User Login**: Registered users can log in using their credentials.

- **OTP Verification**: After logging in, users receive a 6-digit OTP, which must be entered to access their profile.

- **Profile Management**: Users can view their account details after OTP verification.

- **Account Deletion**: Users can delete their profile after authentication using their email, password, and OTP.


## Acknowledgments

- **Vite**: For providing a fast and modern build tool.
- **Chakra UI**: For offering a simple and accessible component library.
- **Supabase**: For providing an open-source alternative to Firebase.
- **MongoDB**: For offering a flexible and scalable NoSQL database.
