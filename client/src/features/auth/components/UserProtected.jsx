import React from "react";
import {useSelector} from "react-redux";
import {selectloggedInUser} from "../authSlice";
import { Navigate } from "react-router-dom";

const UserProtected = ({children}) => {
  const user = useSelector(selectloggedInUser);

  if(!user){
    return ( <Navigate to='/signin' replace={true}></Navigate> )
  }
  return children
};

export default UserProtected;
