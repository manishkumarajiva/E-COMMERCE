import React from 'react';
import './App.css';
import Home from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './features/checkout/Checkout';
import ProductDetails from './pages/ProductDetails';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element : <Home></Home> 
  },
  {
    path: "signin",
    element : <SignInPage></SignInPage> 
  },
  {
    path : "signup",
    element : <SignUpPage></SignUpPage> 
  },
  {
    path : "cart",
    element : <CartPage></CartPage> 
  },
  {
    path : "checkout",
    element : <Checkout></Checkout> 
  },
  {
    path : "product_details/:id",
    element : <ProductDetails></ProductDetails> 
  }
]);



function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
