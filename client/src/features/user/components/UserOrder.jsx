import React, {Fragment, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {getUserOrderAsync} from "../userSlice";
import {selectUserOrders} from "../userSlice";
import {selectloggedInUser} from "../../auth/authSlice";

function UserOrder() {
  const dispatch = useDispatch();
  const user = useSelector(selectloggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(getUserOrderAsync(user.response.id));
  }, [dispatch, user.response.id]);

  console.log(orders)

  return (
    <Fragment>
      <div
        className={`mx-auto xs:w-1/1 sm:w-1/2 md:w-1/2 xl:w-1/2 xxl:w-1/3 px-3 `}
      >
        {/* cart */}
        <p className='sm:text-10xl md:text-4xl text-center text-blue-400'>
          My Orders
        </p>
        <div className='mt-8'>
          <div className='flow-root'>
            {/* product list */}
            <ul>
              {orders.response.map((product) => (
                  <li
                    key={product.id}
                    className='flex sm:flex-row md:flex-row md:px-5 py-6 my-5 shadow-lg hover:shadow-xl'
                  >
                    <div className='h-24  flex-shrink-0 overflow-hidden rounded-xl border-x-2 border-red-400'>
                      <img
                        alt={product.category}
                        src={product.items[0].product.thumbnail}
                        className='h-full w-full object-cover object-center'
                      />
                    </div>

                    <div className='ml-4 flex flex-1 xm:flex-row sm:flex-col md:flex-col'>
                      <div>
                        <div className='lg:mx-auto flex justify-between text-base font-medium text-gray-900'>
                          <h3>
                            <div>OD{product.id}</div>
                            <div className='text-sm text-blue-400'>
                              {product.brand}
                            </div>
                          </h3>
                          <p className='ml-4'>$ {product.totalAmount}</p>
                        </div>
                        <p className='mt-1 text-sm text-gray-500 flex flex-col'>
                        <em>Address : {product.shippingAddress.streetAddress}</em>
                          <strong>Qty : {product.totalItems}</strong>
                        </p>  
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        <div className='mt-6 grid grid-rows-1 grid-cols-1 text-gray-500 border-2'>
          <div className='font-medium text-center text-white hover:bg-blue-600 bg-blue-400'>
            <Link to='/'>
              Continue Shopping
              <span aria-hidden='true'> &rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default UserOrder;
