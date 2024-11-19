import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProfile from '../features/admin/AdminProfile';
import Footer from '../features/common/Footer';
const AdminHomePage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminProfile></AdminProfile>
        </Navbar>
        <Footer></Footer>
    </Fragment>
  )
}

export default AdminHomePage
