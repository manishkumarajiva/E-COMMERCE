import React from "react";
import {useSelector} from "react-redux";
import {selectLoggedInUser} from "../authSlice";
import { Navigate } from "react-router-dom";

const UserProtected = ({children}) => {
  const user = useSelector(selectLoggedInUser);

  if(!user.email){
    return ( <Navigate to='/signin' replace={true}></Navigate> )
  }
  return children
};

export default UserProtected;
