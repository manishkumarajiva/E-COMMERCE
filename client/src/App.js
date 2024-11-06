import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './features/checkout/Checkout';
import ProductDetails from './pages/ProductDetails';
import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import Protected from './features/auth/components/Protected';

import { fetchCartItemsAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';

const router = createBrowserRouter([
  {
    path: "/",
    element : <Protected> <Home></Home> </Protected>
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
    element : <Protected> <CartPage></CartPage> </Protected>
  },
  {
    path : "checkout",
    element : <Protected> <Checkout></Checkout> </Protected>
  },
  {
    path : "product_details/:id",
    element : <Protected> <ProductDetails></ProductDetails> </Protected>
  }
]);



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user.email){
      dispatch(fetchCartItemsAsync(user.id))
    }
  },[dispatch, user])

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
