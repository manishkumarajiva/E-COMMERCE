import React from "react";
import { useSelector } from "react-redux";
import { selectloggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectloggedInUser);

  if (user?.success && user.response.role === 'ADMIN') {
    return children;
  } else {
    return (<Navigate to='/signin' replace={true}></Navigate>)
  }
};

export default AdminProtected;
