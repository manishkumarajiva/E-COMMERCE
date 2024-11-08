import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import UserProfile from '../features/user/components/UserProfile';

const UserProfilePage = () => {
  return (
    <Fragment>
        <Navbar>
            <UserProfile></UserProfile>
        </Navbar>
    </Fragment>
  )
}

export default UserProfilePage
