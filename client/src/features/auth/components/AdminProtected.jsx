import React from "react";
import {useSelector} from "react-redux";
import {selectLoggedInUser} from "../authSlice";
import { Navigate } from "react-router-dom";

const AdminProtected = ({children}) => {
  const user = useSelector(selectLoggedInUser);

  if(!user.email){
    return ( <Navigate to='/signin' replace={true}></Navigate> )
  }else if(user.role === 'ADMIN'){
    return ( <Navigate to='/admin_profile' replace={true}></Navigate> )
  }else {
    return children;
  }

  
};

export default AdminProtected;
