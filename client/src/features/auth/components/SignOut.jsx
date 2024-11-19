import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser, signOutUserAsync } from '../authSlice'
import { useAlert } from 'react-alert';

function SignOut(){
    const alert = useAlert();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    
    useEffect(()=>{
        dispatch(signOutUserAsync())
    },[dispatch])

    alert.success('Logout Successfully')

    return ( <Fragment> {!user && <Navigate to='/signin' ></Navigate>} </Fragment> )
}


export default SignOut