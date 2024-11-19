import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import AdminOrder from '../features/admin/order/AdminOrder';


const AdminOrderPage = () => {
  return (
    <Fragment>
        <Navbar>
            <AdminOrder></AdminOrder>
        </Navbar>
    </Fragment>
  )
}

export default AdminOrderPage
