# E-Commerce Application - MERN Stack

This is an e-commerce application built with the **MERN** stack, featuring user authentication (login, logout, registration), product filtering, cart management, and Stripe integration for payments. The application uses **Passport.js** for authentication and **Crypto** module for hashing passwords.

## Features

- **User Authentication**: 
  - User registration with email and password.
  - Login and logout functionality.
  - Password hashing with **Crypto** module for security.
  - Authentication via **Passport.js**.

- **Product Management**:
  - Display products with features like rating, category, and brand.
  - Product filtering by:
    - Rating (high to low, low to high)
    - Category
    - Brand

- **Shopping Cart**:
  - Add products to the cart.
  - Update cart quantity and remove items.
  - Manage cart state with **Redux Toolkit** for state management.

- **Stripe Integration**:
  - Secure payment gateway using **Stripe**.
  - Complete payment flow for product checkout.

## Tech Stack

- **Frontend**:
  - React.js
  - Redux Toolkit for state management
  - Tailwind CSS for styling

- **Backend**:
  - Node.js with Express.js
  - Passport.js for authentication
  - MongoDB for the database
  - Crypto module for password hashing

- **Payment Integration**:
  - Stripe API

> LOGIN
![APP SCREENSHOT](/client/public/signin.png)


> REGISTER
![APP SCREENSHOT](/client/public/signup.png)


> PRODUCTS
![APP SCREENSHOT](/client/public/product.png)


> CART
![APP SCREENSHOT](/client/public/cart.png)


