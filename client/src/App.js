import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import Checkout from './features/checkout/Checkout';
import ProductDetails from './pages/ProductDetails';
import PageNotFound from './pages/PageNotFound';
import OrderSuccess from './pages/OrderSuccessPage';
import UserOrderPage from './pages/UserOrderPage';
import UserProfilePage from './pages/UserProfilePage';
import SignOut from './features/auth/components/SignOut';
import ForgetPasswordPage from './pages/ForgotPasswordPage';
import AdminHomePage from './pages/AdminHomePage';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrderPage from './pages/AdminOrderPage';
import StripeCheckout from './pages/StripeCheckout';

// Protective Component
import UserProtected from './features/auth/components/UserProtected';
import AdminProtected from './features/auth/components/AdminProtected';

import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { fetchCartItemsAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectloggedInUser } from './features/auth/authSlice';
import { getLoggedInUserAsync } from './features/user/userSlice';
import { checkAuthAsync } from './features/auth/authSlice';

//react alert
import { positions, Provider as AlertProvider, transitions } from 'react-alert';
import  AlertTemplate from 'react-alert-template-basic'


const options = {
  position: positions.TOP_RIGHT,
  timeout: 4000,
  transitions:transitions.SCALE
}



const router = createBrowserRouter([
  {
    path: "/",
    element :  <UserProtected><Home></Home></UserProtected> 
  },
  {
    path : "signup",
    element : <SignUpPage></SignUpPage> 
  },
  {
    path: "signin",
    element : <SignInPage></SignInPage> 
  },
  {
    path : "signout",
    element : <SignOut></SignOut>
  },
  {
    path : "forgot_password",
    element : <ForgetPasswordPage></ForgetPasswordPage> 
  },
  {
    path : "cart",
    element :  <UserProtected><CartPage></CartPage></UserProtected> 
  },
  {
    path : "checkout",
    element :  <UserProtected><Checkout></Checkout></UserProtected>
  },
  {
    path : "product_details/:id",
    element :  <UserProtected><ProductDetails></ProductDetails></UserProtected> 
  },
  {
    path : "user_profile",
    element :  <UserProtected><UserProfilePage></UserProfilePage></UserProtected> 
  },
  {
    path : "user_orders",
    element :  <UserProtected><UserOrderPage></UserOrderPage></UserProtected> 
  },
  {
    path: "admin_product",
    element :  <AdminProtected><AdminProductDetailPage></AdminProductDetailPage></AdminProtected>   
  },
  {
    path: "admin_profile",
    element :  <AdminProtected><AdminHomePage></AdminHomePage></AdminProtected> 
  },
  {
    path: "admin/product/form/:id",
    element :   <AdminProtected><AdminProductFormPage></AdminProductFormPage></AdminProtected> 
  },
  {
    path: "admin_orders",
    element :   <AdminProtected><AdminOrderPage></AdminOrderPage></AdminProtected> 
  },
  {
    path : "order-success/:id",
    element : <UserProtected><OrderSuccess></OrderSuccess></UserProtected>
  },
  {
    path : "stripe-checkout",
    element : <UserProtected><StripeCheckout></StripeCheckout></UserProtected>
  },
  {
    path : "*",
    element : <PageNotFound></PageNotFound> 
  }
]);




function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectloggedInUser);

  useEffect(()=>{
    dispatch(checkAuthAsync());
  },[dispatch])

useEffect(()=>{
  if(loggedInUser){
    dispatch(fetchCartItemsAsync());
    dispatch(getLoggedInUserAsync());
  }
},[dispatch, loggedInUser]) 

return (
    <>
    <AlertProvider template={AlertTemplate} {...options}>
      <RouterProvider router={router}></RouterProvider>
    </AlertProvider>
    </>
  );
}

export default App;
