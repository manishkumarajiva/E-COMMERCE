import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminProductForm from '../features/admin/product/AdminProductForm';

const AdminProductFormPage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminProductForm></AdminProductForm>
        </Navbar>
    </Fragment>
  )
}

export default AdminProductFormPage
