import React from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { selectCount } from './checkoutSlice';
// import {PhotoIcon, UserCircleIcon} from "@heroicons/react/24/solid";
import Cart from "../cart/Cart";

const address = [
  {id : 120, name: "Mark", street: "12MYZ", city: "Toranto", country: "Canada"},
  {id : 101, name: "Emma Bloom", street: "zeSquare", city: "Washington", country: "USA"},
];

export default function Checkout() {
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();

  return (
    <div className='grid sm:grid-cols-1 md:grid-cols-2  grid-rows-1 gap-2 sm:p-2 md:p-12 sm:mx-2  md:mx-12'>
      <div>
        <form className='border-2 p-5'>
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
                    htmlFor='first-name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    First name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='first-name'
                      name='first-name'
                      type='text'
                      autoComplete='given-name'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='last-name'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Last name
                  </label>
                  <div className='mt-2'>
                    <input
                      id='last-name'
                      name='last-name'
                      type='text'
                      autoComplete='family-name'
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
                      name='email'
                      type='email'
                      autoComplete='email'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='sm:col-span-3'>
                  <label
                    htmlFor='country'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Country
                  </label>
                  <div className='mt-2'>
                    <select
                      id='country'
                      name='country'
                      autoComplete='country-name'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className='col-span-full'>
                  <label
                    htmlFor='street-address'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Street address
                  </label>
                  <div className='mt-2'>
                    <input
                      id='street-address'
                      name='street-address'
                      type='text'
                      autoComplete='street-address'
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
                      name='city'
                      type='text'
                      autoComplete='address-level2'
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
                      name='region'
                      type='text'
                      autoComplete='address-level1'
                      className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                  </div>
                </div>

                <div className='sm:col-span-2'>
                  <label
                    htmlFor='postal-code'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    ZIP / Postal code
                  </label>
                  <div className='mt-2'>
                    <input
                      id='postal-code'
                      name='postal-code'
                      type='text'
                      autoComplete='postal-code'
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
                  Shipping Address
                </h2>

                <div className='mt-10 space-y-10'>
                  <ul className='divide-y divide-gray-100'>
                    {address.map((address) => (
                     <section className="grid grid-cols-2 grid-row-1 border-y-2 p-2">
                     <input type="radio" name="address" id={address.id} />
                       <li
                        key={address.id}
                        className='flex justify-between gap-x-6 py-5'
                        id={address.id}
                      >
                        <div className='flex min-w-0 gap-x-4'>
                          <div className='min-w-0 flex-auto'>
                            <p className='text-sm font-semibold leading-6 text-gray-900'>
                              {address.name}
                            </p>
                            <p className='mt-1 truncate text-xs leading-5 text-gray-500'>
                              {address.street} - {address.city}
                            </p>
                          </div>
                        </div>

                        <div className='hidden shrink-0 sm:flex sm:flex-col sm:items-end'>
                          <p className='text-sm leading-6 text-gray-900'>
                            {address.country}
                          </p>
                        </div>
                      </li>
                     </section>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div>
        <Cart></Cart>
      </div>
    </div>
  );
}
