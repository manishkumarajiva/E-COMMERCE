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

import Protected from './features/auth/components/UserProtected';
import AdminProtected from './features/auth/components/AdminProtected';

import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import { fetchCartItemsAsync } from './features/cart/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectloggedInUser } from './features/auth/authSlice';
import { getLoggedInUserAsync } from './features/user/userSlice';
import { checkAuthAsync, selectAuthChecked } from './features/auth/authSlice';

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
    path : "signout",
    element : <SignOut></SignOut> 
  },
  {
    path : "forgot_password",
    element : <ForgetPasswordPage></ForgetPasswordPage> 
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
    path: "admin_product",
    element : <AdminProtected> <AdminProductDetailPage></AdminProductDetailPage>  </AdminProtected> 
  },
  {
    path: "admin_profile",
    element : <AdminProtected> <AdminHomePage></AdminHomePage> </AdminProtected>
  },
  {
    path: "admin/product/form/:id",
    element : <AdminProtected>  <AdminProductFormPage></AdminProductFormPage> </AdminProtected>
  },
  {
    path: "admin_orders",
    element :  <AdminProtected> <AdminOrderPage></AdminOrderPage> </AdminProtected>
  },
  {
    path : "order-success/:id",
    element : <OrderSuccess></OrderSuccess>
  },
  {
    path : "stripe-checkout",
    element : <StripeCheckout></StripeCheckout>
  },
  {
    path : "*",
    element : <PageNotFound></PageNotFound> 
  }
]);




function App() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectloggedInUser);
  const authChecked = useSelector(selectAuthChecked);

  useEffect(()=>{
    console.log('work')
    dispatch(checkAuthAsync());
  },[dispatch])

  useEffect(()=>{
    if(loggedInUser?.response){
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
