import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './features/checkout/Checkout';
import ProductDetails from './pages/ProductDetails';
import Protected from './features/auth/components/Protected';
import PageNotFound from './pages/PageNotFound';
import OrderSuccess from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';


import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { fetchCartItemsAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoggedInUser } from './features/auth/authSlice';
import { getLoggedInUserAsync } from './features/user/userSlice';



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
  },
  {
    path : "user_profile",
    element : <Protected> <UserProfilePage></UserProfilePage> </Protected>
  },
  {
    path : "user_orders",
    element : <Protected> <UserOrderPage></UserOrderPage> </Protected>
  },
  {
    path : "order_success/:id",
    element : <OrderSuccess></OrderSuccess>
  },
  {
    path : "*",
    element : <PageNotFound></PageNotFound> 
  }
]);



function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);

  useEffect(()=>{
    if(user.email){
      dispatch(fetchCartItemsAsync(user.id))
      dispatch(getLoggedInUserAsync(user.id))
    }
  },[dispatch, user])

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
