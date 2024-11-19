import {Fragment, useState} from "react";
import {Link, Navigate} from "react-router-dom";
import {selectCartItems} from "../cart/cartSlice";
import {useSelector, useDispatch} from "react-redux";
import {updateCartItemAsync, deleteCartItemAsync} from "../cart/cartSlice";
import Model from "../common/Modal";
import { useAlert } from "react-alert";

export default function Cart() {
  const alert = useAlert();
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const [openModel, setOpenModel] = useState(null);

  const updateHandler = (e, product) => {
    e.preventDefault();
    dispatch(updateCartItemAsync({...product, quantity: +e.target.value}));
  };

  const deleteHandler = (e, productId) => {
    dispatch(deleteCartItemAsync(productId));
    alert.success('Removed 🔴')
  };

  return (
    <Fragment>
      {!cartItems.length && <Navigate to={"/"}></Navigate>}
      <div
        className={`mx-auto sm:w-1/1 md:w-1/1 xl:w-1/2 xxl:w-1/2 bg-gray-50 md:px-2 lg:px-5`}
      >
        {/* cart */}
        <p className='sm:text-10xl md:text-4xl text-center'> Cart </p>
        <div className='mt-8'>
          <div className='flow-root'>
            {/* product list */}
            <ul className='-my-6 divide-y divide-gray-200'>
              {cartItems.map((product) => (
                <li
                  key={product.id}
                  className='flex md:flex-col lg:flex-col xl:flex-row  py-6'
                >
                  <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border-x-2 border-red-400'>
                    <img
                      alt={product.category}
                      src={product.images[0]}
                      className='h-full w-full object-cover object-center'
                    />
                  </div>

                  <div className='ml-4 flex flex-1 flex-col'>
                    <div>
                      <div className='lg:mx-auto flex justify-between text-base font-medium text-gray-900'>
                        <h3>
                          <div href={product.href}>{product.title}</div>
                          <div
                            className='text-sm text-slate-600'
                            href={product.href}
                          >
                            {product.brand}
                          </div>
                        </h3>
                        <p className='ml-4'>$ {product.price}</p>
                      </div>
                      <p className='mt-1 text-sm text-gray-500'>
                        {product.color}
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
                          onChange={(e) => updateHandler(e, product)}
                          value={product.quantity}
                          className='h-6 w-10 p-0 border-0 ms-2'
                          id='qty'
                        >
                          <option value='1'>1</option>
                          <option value='2'>2</option>
                          <option value='3'>3</option>
                        </select>
                      </div>

                      <div className='flex'>
                        <Model
                          title={`Delete ${product.title}`}
                          message={product.description}
                          image={product.thumbnail}
                          actionTypeButton={"Remove"}
                          cancelButton={"Cancel"}
                          cancelAction={()=>setOpenModel(false)}
                          deleteAction={(e)=>deleteHandler(e, product.id)}
                          showModel={openModel === product.id}
                        ></Model>
                        <button
                          onClick={() => setOpenModel(product.id)}
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

          <div className='mt-6'>
            <Link
              to='/checkout'
              className='flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700'
            >
              Checkout
            </Link>
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
    </Fragment>
  );
}

