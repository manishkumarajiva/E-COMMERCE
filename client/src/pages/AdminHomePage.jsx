import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProfile from '../features/admin/AdminProfile';

const AdminHomePage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminProfile></AdminProfile>
        </Navbar>
    </Fragment>
  )
}

export default AdminHomePage
