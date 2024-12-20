import React, {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAllOrderAsync} from "../../order/orderSlice";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";

import { selectAllOrders, selectTotalOrder, updateOrderStatusAsync } from "../../order/orderSlice"; //selector
import Pagination from "../../common/Pagination";

import {ITEM_PER_PAGE} from "../../../app/constants";
import {STATUS} from "../../../app/constants";
import {statusColorHandler} from "../../../app/constants";
const selectStyle = "px-2 py-1 text-sm font-semibold rounded-md";



function AdminOrder() {
  const dispatch = useDispatch();
  const orders = useSelector(selectAllOrders);
  const orderCount = useSelector(selectTotalOrder);
  const [editOrderId, setEditOrderId] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});

  useEffect(() => {
    const pagination = {_page: page, _limit: ITEM_PER_PAGE};
    dispatch(getAllOrderAsync({pagination, sort}));
  }, [dispatch, page, sort]);

  const paginationHandler = (page) => {
    setPage(page);
  };

  
 const sortHandler = (options) => {
  const sort = {_sort : options.sort, _order : options.order}
  setSort(sort);
 }

  const orderStatusHandler = (e, orderId) => {
    const orderStatus = e.target.value;
    const newOrder = {id : orderId, status: orderStatus};
    dispatch(updateOrderStatusAsync(newOrder));
    setEditOrderId(0);
  };

  const viewHandler = (e, id) => {};

  const totalPage = Math.ceil(orderCount / ITEM_PER_PAGE);


  return (
    <Fragment>
      {/* component */}
      <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          {/* table heading */}
          <thead className='bg-gray-50 text-center'>
            <tr>
              <th onClick={()=>{sortHandler({sort : 'id', order : sort?._order === 'asc' ? 'desc' : 'asc'})}} scope='col' className='cursor-pointer px-6 py-4 font-medium text-gray-900'>
                <span className="flex">OrderId {"  "} {sort?._order === 'asc' ? <ArrowDownIcon className="w-4"></ArrowDownIcon> : <ArrowUpIcon className="w-4"></ArrowUpIcon> } </span> 
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Items
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Total Amount
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900'>
                Shipping Address
              </th>
              <th onClick={()=>{sortHandler({sort : 'status', order : sort?._order === 'asc' ? 'desc' : 'asc'})}} scope='col' className='cursor-pointer px-6 py-4 font-medium text-gray-900'>
              <span className="flex">Status {"  "} {sort?._order === 'asc' ? <ArrowDownIcon className="w-4"></ArrowDownIcon> : <ArrowUpIcon className="w-4"></ArrowUpIcon> } </span> 
              </th>
              <th scope='col' className='px-6 py-4 font-medium text-gray-900' />
            </tr>
          </thead>

          {/* table body */}
          <tbody className='divide-y divide-gray-100  border-gray-100 '>
            { orders.response &&
             orders.response.map((order, indx) => {
                return (
                  <tr className='hover:bg-gray-50' key={indx}>
                    <th className='flex gap-3 px-6 py-4 font-normal text-gray-900'>
                      <div className='text-sm'>
                        <div className='font-medium text-gray-700'>
                          {order.id}
                        </div>
                      </div>
                    </th>
                    <td className='px-6 py-4'>
                      {order.items.map((item) => {
                        return (
                          <div>
                            <img
                              src={item.product.thumbnail}
                              className='w-16 mx-auto'
                              alt='product thumbnail'
                            />
                            <p className='text-center'> {item.title} </p>
                          </div>
                        );
                      })}
                    </td>
                    <td className='text-center'> {500} </td>
                    <td className='px-6 py-4'>
                      <div className='text-center'>
                        <strong> {order.shippingAddress.email} </strong>
                        <div> {order.shippingAddress.contact} </div>
                        <div> {order.shippingAddress.city} </div>
                        <div> {order.shippingAddress.region} </div>
                        <div> {order.shippingAddress.pincode} </div>
                        <div> {order.shippingAddress.streetAddress} </div>
                      </div>
                    </td>
                    <td className='px-6 py-4'>
                      <div className='flex gap-2'>
                        {editOrderId !== order.id ? (
                          <span
                            className={`${statusColorHandler(
                              order.orderStatus
                            )} inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold`}
                          >
                            {order.orderStatus}
                          </span>
                        ) : (
                          <select
                            className={selectStyle}
                            onChange={(e) => orderStatusHandler(e, order.id)}
                          >
                            {STATUS.map((status, index) => (
                              <option key={index} value={status}> {status} </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </td>
                    {/* button */}
                    <td className='px-6 py-4'>
                      <div className='flex justify-end gap-4'>
                        <button onClick={(e) => viewHandler(e, order.id)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='size-6'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z'
                            />
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                            />
                          </svg>
                        </button>
                        <button onClick={() => setEditOrderId(order.id)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='h-6 w-6'
                            x-tooltip='tooltip'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <Pagination
        page={page}
        totalPage={totalPage}
        totalProduct={orderCount}
        paginationHandler={paginationHandler}
      ></Pagination>
    </Fragment>
  );
}

export default AdminOrder;
