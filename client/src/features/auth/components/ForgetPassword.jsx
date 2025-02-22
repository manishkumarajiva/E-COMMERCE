import React from "react";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";


function ForgetPassword() {
  const { register, handleSubmit, formState: {errors} } = useForm();
  const onSubmit = (data) => console.log((data));

  return (
    <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <img
          alt='Your Company'
          src='data:image/jpeg;base64,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'
          className='mx-auto h-10 w-auto'
        />
        <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
          Forget Password
        </h2>
      </div>

      <div className='mt-5 sm:mx-auto sm:w-full sm:max-w-sm'>
        {/* singin form */}
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              Email address
            </label>
            <div className='mt-2'>
              <input
                type='text'
                {...register("email", {
                  required: "Please Enter Your Email!",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please Enter A Valid Email!",
                  },
                })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
            {errors.email && (
              <span className='text-red-500'>{errors.email.message}</span>
            )}
          </div>

          <div>
            <button
              type='submit'
              className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Send Email
            </button>
          </div>
        </form>

        <p className='mt-2 text-center text-sm text-gray-500'>
          <Link
            to='/signin'
            className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
          >
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ForgetPassword;
