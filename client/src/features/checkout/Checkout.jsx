import React, {Fragment, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
// async operation
import {updateUserAsync} from "../user/userSlice";
import { updateCartItemAsync, deleteCartItemAsync } from "../cart/cartSlice";
import { createOrderAsync } from '../order/orderSlice';
// selecters
import { selectCartItems } from "../cart/cartSlice";
import { selectUserInfo } from "../user/userSlice";
import { selectCurrentOrder } from '../order/orderSlice';

import {useForm} from "react-hook-form";
import { useAlert } from "react-alert";

export default function Checkout() {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const cartItems = useSelector(selectCartItems);
  const order = useSelector(selectCurrentOrder);

  const alert = useAlert();

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => 
    dispatch(updateUserAsync({...user, addresses: [...user.addresses, data]}));

  const addressHandler = (e) => setSelectedAddress(user.addresses[e.target.value]);

  const paymentHandler = (e) => setPaymentMethod(e.target.value);


  const orderHandler = (e) => {
    e.preventDefault();

    if(selectedAddress && paymentMethod){
      
      const orderPayload = {
        user : user.response.id,
        items : cartItems.response,
        totalItems : cartItems.response.length,
        totalAmount : 2000,
        shippingAddress : selectedAddress,
        paymentMethod : paymentMethod
      }
      dispatch(createOrderAsync(orderPayload));
    }else{
      alert.info('Please choose address and payment method');
    }
  }


// -------- CART ITEM HANDLER ---------- //
  const updateHandler = (e, id, item) => {
    e.preventDefault();
    dispatch(updateCartItemAsync({cartId : id, quantity : +e.target.value, item}))
  }

  const deleteHandler = (e, productId) => {
    e.preventDefault();
    dispatch(deleteCartItemAsync(productId))
  }
// -------- CART ITEM HANDLER ---------- //


  return (
    <Fragment>
      {!cartItems.response.length && <Navigate to={"/"}></Navigate>}
      {order?.paymentMethod === 'CASH' &&  <Navigate to={`/order-success/${order.id}`}></Navigate>}
      {order?.paymentMethod === 'CARD' &&  <Navigate to={`/stripe-checkout`}></Navigate>}
      <div className='grid sm:grid-cols-1 md:grid-cols-2  grid-rows-1 gap-2 sm:p-2 md:p-12 sm:mx-2  md:mx-12 sm:gap-x-5 lg:gap-x-20'>
        <div>
          {/* form */}
          <form onSubmit={handleSubmit(onSubmit)} className='border-2 p-5'>
            <div>
              <div>
                <h2 className='text-base font-semibold leading-7 text-gray-900'>
                  Personal Information
                </h2>
                <p className='mt-1 text-sm leading-6 text-gray-600'>
                  Use a permanent address where you can receive mail.
                </p>

                <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='firstName'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      First name
                    </label>
                    <div className='mt-2'>
                      <input
                        id='firstName'
                        {...register("firstName", {required: true})}
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='lastName'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Last name
                    </label>
                    <div className='mt-2'>
                      <input
                        id='lastName'
                        {...register("lastName", {required: true})}
                        type='text'
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-4'>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Email address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='email'
                        type='email'
                        {...register("email", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-3'>
                    <label
                      htmlFor='contact'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Contact Number
                    </label>
                    <div className='mt-2'>
                      <input
                        id='contact'
                        type='tel'
                        {...register("contact", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                      ></input>
                    </div>
                  </div>

                  <div className='col-span-full'>
                    <label
                      htmlFor='streetAddress'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      Street address
                    </label>
                    <div className='mt-2'>
                      <input
                        id='streetAddress'
                        type='text'
                        {...register("streetAddress", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2 sm:col-start-1'>
                    <label
                      htmlFor='city'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      City
                    </label>
                    <div className='mt-2'>
                      <input
                        id='city'
                        type='text'
                        {...register("city", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='region'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      State / Province
                    </label>
                    <div className='mt-2'>
                      <input
                        id='region'
                        type='text'
                        {...register("region", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>

                  <div className='sm:col-span-2'>
                    <label
                      htmlFor='pincode'
                      className='block text-sm font-medium leading-6 text-gray-900'
                    >
                      ZIP / Postal code
                    </label>
                    <div className='mt-2'>
                      <input
                        id='pincode'
                        type='text'
                        {...register("pincode", {required: true})}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-6 flex items-center justify-end gap-x-6'>
                  <button
                    type='submit'
                    className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                  >
                    Add New Address
                  </button>
                </div>

                {/* Address */}
                <div>
                  <h2 className='text-base font-semibold leading-7 text-blue-600'>
                    Select Shipping Address
                  </h2>

                  <div className='mt-10 space-y-10'>
                    <ul className='divide-y divide-gray-100'>
                      {user?.addresses &&
                        user.addresses.map((address, index) => (
                          <section
                            className='grid grid-cols-3 grid-row-1 border-y-2 p-2'
                            key={index}
                          >
                            <input
                              type='radio'
                              name='address'
                              id={index}
                              value={index}
                              onClick={addressHandler}
                              className='m-3'
                            />

                            <li
                              key={index}
                              className='col-span-2 flex justify-between gap-x-6 py-2'
                            >
                              <div className='flex min-w-0 gap-x-4'>
                                <div className='min-w-0 flex-auto'>
                                  <p className='text-sm font-semibold leading-6 text-gray-900'>
                                    {address.firstName} {address.lastName}
                                  </p>
                                  <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                                    {address.streetAddress}
                                  </p>
                                </div>
                              </div>

                              <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                                <p className='text-sm leading-6 text-gray-900'>
                                  {address.contact}
                                </p>
                              </div>
                            </li>
                          </section>
                        ))}
                    </ul>
                  </div>
                </div>

                {/* PAYMENT TYPE */}
                <div className='flex flex-col'>
                  <div>
                    <input
                      type='radio'
                      name='payment'
                      id='cash'
                      value='CASH'
                      checked={paymentMethod === "CASH"}
                      onChange={paymentHandler}
                    />
                    <label htmlFor='cash' className='ms-2'>
                      {" "}
                      Cash{" "}
                    </label>
                  </div>
                  <div>
                    <input
                      type='radio'
                      name='payment'
                      id='online'
                      value='CARD'
                      checked={paymentMethod === "CARD"}
                      onChange={paymentHandler}
                    />
                    <label htmlFor='online' className='ms-2'>
                      {" "}
                      Online{" "}
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Cart items */}
        <div>
          <div className={`mx-auto sm:w-1/1 md:w-1/1 xl:w-1/1 xxl:w-1/2 bg-gray-50 md:px-2 lg:px-5`} >
            {/* cart */}
            <p className='sm:text-10xl md:text-4xl text-center'> Cart </p>
            <div className='mt-8'>
              <div className='flow-root'>
                {/* product list */}
                <ul className='-my-6 divide-y divide-gray-200'>
                  {cartItems.response.map((cart) => (
                    <li
                      key={cart.product.id}
                      className='flex md:flex-col lg:flex-col xl:flex-row  py-6'
                    >
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-x-2 border-red-400'>
                        <img
                          alt={cart.product.category}
                          src={cart.product.images[0]}
                          className='h-full w-full object-cover object-center'
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='lg:mx-auto flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <div href={cart.product.href}>{cart.product.title}</div>
                              <div
                                className='text-sm text-slate-600'
                                href={cart.product.href}
                              >
                                {cart.product.brand}
                              </div>
                            </h3>
                            <p className='ml-4'>$ {cart.product.price}</p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            {cart.product.color}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <div className='flex'>
                            <label
                              htmlFor='qty'
                              className='block text-sm font-medium leading-6 text-gray-900'
                            >
                              Qty
                            </label>
                            <select
                              onChange={(e) => updateHandler(e, cart.id, cart.product)}
                              value={cart.quantity}
                              className='h-6 w-10 p-0 border-0 ms-2'
                              id='qty'
                            >
                              <option value='1'>1</option>
                              <option value='2'>2</option>
                              <option value='3'>3</option>
                            </select>
                          </div>

                          <div className='flex'>
                            <button
                              onClick={(e) => deleteHandler(e, cart.id)}
                              type='button'
                              className='font-medium text-red-600 border-2 border-red-200 px-2 hover:text-indigo-500'
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* subtotal */}
            <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
              <div className='flex justify-between text-base font-medium text-gray-900'>
                <p>Subtotal</p>
                <p>$262.00</p>
              </div>
              <p className='mt-0.5 text-sm text-gray-500'>
                Shipping and taxes calculated at checkout.
              </p>

              <div className='mt-6 grid grid-rows-1 grid-cols-1'>
                <button
                  onClick={orderHandler}
                  className='rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
                >
                  Place Order
                </button>
              </div>

              <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
                <p>
                  or
                  <Link to='/'>
                    <button
                      type='button'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      Continue Shopping
                      <span aria-hidden='true'> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
