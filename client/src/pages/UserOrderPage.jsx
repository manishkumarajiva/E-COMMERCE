import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import UserOrder from '../features/user/components/UserOrder';

const UserOrderPage = () => {
  return (
    <Fragment>
        <Navbar>
            <UserOrder></UserOrder>
        </Navbar>
    </Fragment>
  )
}

export default UserOrderPage
