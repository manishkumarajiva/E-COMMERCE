import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductDetail from '../features/admin/product/AdminProductDetail';

const AdminProductDetailPage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminProductDetail></AdminProductDetail>
        </Navbar>
    </Fragment>
  )
}

export default AdminProductDetailPage
