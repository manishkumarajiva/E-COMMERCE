import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectloggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const user = useSelector(selectloggedInUser);

  useState(() => {
    if (user && user?.role === 'ADMIN') {
      return children;
    } else {
      return (<Navigate to='/signin' replace={true}></Navigate>)
    }
  }, [user])
};

export default AdminProtected;
