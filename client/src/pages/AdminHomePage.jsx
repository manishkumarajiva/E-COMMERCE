import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductList from '../features/admin/product/AdminProduct';

const AdminHomePage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
    </Fragment>
  )
}

export default AdminHomePage
