import React, {Fragment, useState} from "react";
import {useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { selectUserInfo } from '../user/userSlice'
import AdminProductList from './product/AdminProductList'

function AdminProfile() {
  const user = useSelector(selectUserInfo);
  
  return (
    <Fragment>
      <div className='container mx-auto'>

        <div className="px-5 mt-4">
          <Link to='/productform' className='px-3 py-2 text-white bg-green-500 rounded-md hover:bg-blue-500'> Add Product </Link>
        </div>

        <div>
          <AdminProductList></AdminProductList>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminProfile;





















function AdminInfo({user}) {
  return (
    <Fragment>
      <div className=''>
        Email : <h1> {user.email} </h1>
        Name : <h3> {user.name ? user.name : "Your Name"} </h3>
      </div>
    </Fragment>
  );
}

