import React from 'react';
import './App.css';
import Home from './pages/HomePage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
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
  }
]);



function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
