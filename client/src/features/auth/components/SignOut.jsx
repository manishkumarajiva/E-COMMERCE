import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectloggedInUser, SignOutUserAsync } from '../authSlice'
import { useAlert } from 'react-alert';

function SignOut(){
    const alert = useAlert();
    const dispatch = useDispatch();
    const loggedInUser = useSelector(selectloggedInUser);
    
    useEffect(()=>{
        dispatch(SignOutUserAsync())
    },[dispatch])

    alert.success('Logout Successfully')

    return ( <Fragment> {!loggedInUser && <Navigate to='/signin' ></Navigate>} </Fragment> )
}


export default SignOut