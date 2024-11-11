import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectLoggedInUser, signOutUserAsync } from '../authSlice'

function SignOut(){
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);
    
    useEffect(()=>{
        dispatch(signOutUserAsync())
    })
    return ( <Fragment> {!user && <Navigate to='/signin' ></Navigate>} </Fragment> )
}


export default SignOut