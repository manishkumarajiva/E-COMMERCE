import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectAuthChecked, SignOutUserAsync } from '../authSlice'
import { useAlert } from 'react-alert';

function SignOut(){
    const alert = useAlert();
    const dispatch = useDispatch();
    const authenticate = useSelector(selectAuthChecked);
    
    useEffect(()=>{
        dispatch(SignOutUserAsync())
    },[dispatch, authenticate])

    alert.success('Logout Successfully')

    return ( <Fragment> {authenticate === false && <Navigate to='/signin' ></Navigate>} </Fragment> )
}


export default SignOut