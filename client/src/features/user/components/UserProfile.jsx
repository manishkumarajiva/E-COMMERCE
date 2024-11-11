import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {updateUserAsync} from "../userSlice";
import {selectUserInfo} from "../userSlice";
import {useForm} from "react-hook-form";

function UserProfile() {
  const user = useSelector(selectUserInfo);
  const [openAddressForm, setAddressForm] = useState(false);
  return (
    <Fragment>
      <div className='container mx-auto'>

        <div className='px-5 rounded-lg'>
          <h1 className='text-xl'>Profile Info</h1>
          <UserInfo user={user}></UserInfo>
        </div>

        <div className="px-5 mt-4">
          <button onClick={()=>setAddressForm(openAddressForm ? false : true)} className='px-3 py-2 text-white bg-green-500 rounded-md hover:bg-blue-500'> {!openAddressForm ? 'Add New Shipping Address'  : 'Close Address Form' } </button>
          { openAddressForm && <AddNewShippingAddress user={user} closeForm={setAddressForm}></AddNewShippingAddress>}
        </div>

        <div className='px-5'>
          <UserAddress user={user} addresses={user.address}></UserAddress>
        </div>

      </div>
    </Fragment>
  );
}

export default UserProfile;




function UserInfo({user}) {
  return (
    <Fragment>
      <div className=''>
        Email : <h1> {user.email} </h1>
        Name : <h3> {user.name ? user.name : "Your Name"} </h3>
        <p> Your Total Orders are :- {585}</p>
      </div>
    </Fragment>
  );
}

function UserAddress({user, addresses}) {
  const {register, handleSubmit, setValue} = useForm();
  const dispatch = useDispatch();
  const [addressIndex, setAddressIndex] = useState(-1);

  const editFormHandler = (e, index) => {
    e.preventDefault();
    setAddressIndex(index);

    const address = addresses[index];
    setValue("firstName", address.firstName);
    setValue("lastName", address.lastName);
    setValue("email", address.email);
    setValue("contact", address.contact);
    setValue("streetAddress", address.streetAddress);
    setValue("city", address.city);
    setValue("region", address.region);
    setValue("pincode", address.pincode);
  };

  const updateAddressHandler = (data, index) => {
    const newAddress = {...user, address: [...user.address]};
    newAddress.address.splice(index, 1, data);
    dispatch(updateUserAsync(newAddress));
    setAddressIndex(-1);
  };

  const deleteHandler = (e, index) => {
    const removeAddress = {...user, address: [...user.address]};
    removeAddress.address.splice(index, 1);
    dispatch(updateUserAsync(removeAddress));
  };

  return (
    <Fragment>
      <div className='mt-5 space-y-10'>
        <ul>
          {addresses?.map((address, index) => (
            <section key={index} className='my-5'>
              {addressIndex === index && (
                <form
                  onSubmit={handleSubmit((data) => {
                    updateAddressHandler(data, index);
                  })}
                  className='border-2 p-5'
                >
                  <div>
                    <div>
                      <h2 className='text-base font-semibold leading-7 text-gray-900'>
                        Update Address
                      </h2>

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
                          Update Address
                        </button>

                        <button
                          onClick={() => setAddressIndex(-1)}
                          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                          Cancel Editing
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}

              {/* Address Information Section */}
              <li className='bg-slate-200 flex justify-between sm:flex-row flex-col p-5'>
                <div className='flex min-w-0 gap-x-4'>
                  <div className='min-w-0 flex-auto'>
                    {/* Customer Name */}
                    <p className='text-sm font-semibold text-gray-900'>
                      Customer Name: {address.firstName} {address.lastName}
                    </p>
                    {/* Customer Address */}
                    <p className='mt-1 text-xs text-black'>
                      Your Address: {address.streetAddress.substring(0, 50)}
                    </p>
                    {/* Region and City */}
                    <p className='mt-1 text-xs text-black'>
                      {address.region} - {address.city}
                    </p>
                    {/* Pin Code */}
                    <p className='mt-1 text-xs text-black'>
                      Pin Code: {address.pincode}
                    </p>
                  </div>
                </div>

                {/* Contact Information Section (visible only on larger screens) */}
                <div className='hidden sm:flex sm:flex-col sm:items-end'>
                  {/* Mobile Number */}
                  <p className='text-sm text-gray-900'>
                    Mobile: {address.contact}
                  </p>
                  {/* Region Information */}
                  <p className='mt-1 text-xs text-black'>
                    Region: {address.region}
                  </p>
                </div>

                {/* Action Buttons (Remove and Edit) */}
                <div className='flex flex-col'>
                  {/* Remove Button */}
                  <button
                    onClick={(e) => deleteHandler(e, index)}
                    type='button'
                    className='my-2 font-medium text-red-600 border-2 border-red-200 hover:border-red-400 px-2'
                  >
                    Remove
                  </button>
                  {/* Edit Button */}
                  <button
                    onClick={(e) => editFormHandler(e, index)}
                    type='button'
                    className='font-medium text-blue-600 border-2 border-blue-200 hover:border-blue-400 hover:text-indigo-500 px-2'
                  >
                    Edit
                  </button>
                </div>
              </li>
            </section>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

function AddNewShippingAddress({user, closeForm}) {
  const {register, handleSubmit} = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    const newAddress = {...user, address : [...user.address, data]}
    dispatch(updateUserAsync(newAddress));
    closeForm(false)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='border-2 p-5'>
      <div>
        <div>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            New Shipping Address
          </h2>

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
              New Address
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
