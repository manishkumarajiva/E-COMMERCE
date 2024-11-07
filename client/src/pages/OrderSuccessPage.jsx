import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { removeCartItemAsync } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

import { selectLoggedInUser } from "../features/auth/authSlice";
import { resetCurrentOrder } from "../features/order/orderSlice";

function OrderSuccess() {
    const params = useParams();
    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser);

    useEffect(()=>{
      dispatch(removeCartItemAsync(user.id))
      dispatch(resetCurrentOrder());
    },[dispatch, user])

  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        <p className='text-base font-semibold text-indigo-600'>Thank you for shopping</p>
        <h1 className='mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl'>
          ORDER ID :- { params?.id }
        </h1>
        <p className='mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8'>
            Happy Shopping  
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <Link 
            to='/'
            className='rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Go back home
          </Link>
          
        </div>
      </div>
    </main>
  );
}

export default OrderSuccess;