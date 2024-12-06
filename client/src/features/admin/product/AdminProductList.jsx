import React, {useState, Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {ITEM_PER_PAGE} from "../../../app/constants";
import {Link} from "react-router-dom";
import {useAlert} from "react-alert";
import LoaderPage from "../../../pages/LoaderPage";

import {
  getFilteredProductList,
  getCategoryList,
  getBrandList,
  deleteProductAsync,
} from "../../product/productSlice";

import {
  selectAllProduct,
  totalProducts,
  selectProductStatus,
  categoryList,
  brandList,
} from "../../product/productSlice";

import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/20/solid";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import {XMarkIcon} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

const sortOptions = [
  {name: "Rating", sort: "rating", order: "asc", current: false},
  {name: "Price: Low to High", sort: "price", order: "desc", current: false},
  {name: "Price: High to Low", sort: "price", order: "asc", current: false},
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function AdminProductList() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const categories = useSelector(categoryList);
  const brands = useSelector(brandList);
  const products = useSelector(selectAllProduct);
  const productStatus = useSelector(selectProductStatus);
  const totalProduct = useSelector(totalProducts);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  useEffect(() => {
    const pagination = {_page: page, _limit: ITEM_PER_PAGE};
    dispatch(getFilteredProductList({filter, sort, pagination}));
  }, [dispatch, filter, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [sort, filter]);

  useEffect(() => {
    dispatch(getCategoryList());
    dispatch(getBrandList());
  }, [dispatch]);

  let totalPage = Math.ceil(totalProduct / ITEM_PER_PAGE);

  const filterHandler = (e, section, option) => {
    let key = option.id;
    let value = section.value;

    let newFilter = {...filter};

    if (e.target.checked) {
      // newFilter = {...filter, [key]: value};

      if (newFilter[key]) {
        newFilter[key].push(value);
      } else {
        newFilter[key] = [value];
      }
    } else {
      // delete newFilter[key]
      const index = newFilter[key].findIndex((ele) => ele === value);
      newFilter[key].splice(index);
    }
    setFilter(newFilter);
  };

  const shortingHandler = (e, option) => {
    e.preventDefault();
    let key = option.sort;
    let value = option.order;
    let sort = {_sort: key, _order: value};
    setSort(sort);
  };

  const paginationHandler = (page) => {
    setPage(page);
  };

  const deleteHandler = (data) => {
    const product = {...data};
    product.deleted = true;
    dispatch(deleteProductAsync(product));
  };

  return (
    <Fragment>
      <div className='bg-white'>
        <div>
          {/* Mobile filter dialog */}
          <Dialog
            open={mobileFiltersOpen}
            onClose={setMobileFiltersOpen}
            className='relative z-40 lg:hidden'
          >
            <DialogBackdrop
              transition
              className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
            />

            <div className='fixed inset-0 z-40 flex'>
              <DialogPanel
                transition
                className='relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'
              >
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    onClick={() => setMobileFiltersOpen(false)}
                    className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                  </button>
                </div>

                {/* Filters */}
                <form className='mt-4 border-t border-gray-200'>
                  <h3 className='sr-only'>Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as='div'
                      className='border-t border-gray-200 px-4 py-6'
                    >
                      <h3 className='-mx-2 -my-3 flow-root'>
                        <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                          <span className='font-medium text-gray-900'>
                            {section.name}
                          </span>
                          <span className='ml-6 flex items-center'>
                            <PlusIcon
                              aria-hidden='true'
                              className='h-5 w-5 group-data-[open]:hidden'
                            />
                            <MinusIcon
                              aria-hidden='true'
                              className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className='pt-6'>
                        <div className='space-y-6'>
                          {section.options.map((option, optionIdx) => (
                            <div key={optionIdx} className='flex items-center'>
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-mobile-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type='checkbox'
                                onChange={(e) =>
                                  filterHandler(e, option, section)
                                }
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                className='ml-3 min-w-0 flex-1 text-gray-500'
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </DialogPanel>
            </div>
          </Dialog>

          <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
            <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
              <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
                Product List
              </h1>

              <div className='flex items-center'>
                <Menu as='div' className='relative inline-block text-left'>
                  <div>
                    <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                      Sort
                      <ChevronDownIcon
                        aria-hidden='true'
                        className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                      />
                    </MenuButton>
                  </div>

                  <MenuItems
                    transition
                    className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'
                  >
                    {/* sort option */}
                    <div className='py-1'>
                      {sortOptions.map((option) => (
                        <MenuItem key={option.name}>
                          <div
                            onClick={(e) => shortingHandler(e, option)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                            )}
                          >
                            {option.name}
                          </div>
                        </MenuItem>
                      ))}
                    </div>
                  </MenuItems>
                </Menu>

                <button
                  type='button'
                  className='-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7'
                >
                  <span className='sr-only'>View grid</span>
                  <Squares2X2Icon aria-hidden='true' className='h-5 w-5' />
                </button>
                <button
                  type='button'
                  onClick={() => setMobileFiltersOpen(true)}
                  className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'
                >
                  <span className='sr-only'>Filters</span>
                  <FunnelIcon aria-hidden='true' className='h-5 w-5' />
                </button>
              </div>
            </div>

            <section aria-labelledby='products-heading' className='pb-24 pt-6'>
              <h2 id='products-heading' className='sr-only'>
                Products
              </h2>

              <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
                {/* Filters */}
                <form className='hidden lg:block'>
                  <h3 className='sr-only'>Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as='div'
                      className='border-b border-gray-200 py-6'
                    >
                      <h3 className='-my-3 flow-root'>
                        <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                          <span className='font-medium text-gray-900'>
                            {section.name}
                          </span>
                          <span className='ml-6 flex items-center'>
                            <PlusIcon
                              aria-hidden='true'
                              className='h-5 w-5 group-data-[open]:hidden'
                            />
                            <MinusIcon
                              aria-hidden='true'
                              className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className='pt-6'>
                        <div className='space-y-4'>
                          {section.options.map((option, optionIdx) => (
                            <div key={optionIdx} className='flex items-center'>
                              <input
                                defaultValue={option.value}
                                defaultChecked={option.checked}
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                type='checkbox'
                                onChange={(e) =>
                                  filterHandler(e, option, section)
                                }
                                className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className='ml-3 text-sm text-gray-600'
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className='lg:col-span-4'>
                  {
                    <div className='bg-white'>
                      <div className='mx-auto max-w-2xl lg:max-w-7xl'>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                          Products
                        </h2>

                        <div className='flex flex-wrap justify-center'>
                          {/* products */}
                          {productStatus === "pending" ? (
                            <LoaderPage />
                          ) : (
                            products.response.map((product) => (
                              <div
                                key={product.id}
                                className='my-10 mx-0 w-64 h-[420px] bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105'
                              >
                                <Link
                                  to={`/product_details/${product.id}`}
                                  className='block h-full'
                                >
                                  <div className='relative'>
                                    <img
                                      alt={product.imageAlt}
                                      src={product.thumbnail}
                                      className='w-full h-48 object-cover rounded-t-lg'
                                    />
                                  </div>
                                  <div className='p-4'>
                                    <h3 className='text-lg font-semibold text-gray-800 truncate'>
                                      {product.title}
                                    </h3>
                                    <p className='text-sm text-gray-600 mb-2'>
                                      {product.category}
                                    </p>

                                    <div className='flex justify-between items-center mb-3'>
                                      <p className='text-xl font-bold text-gray-900'>
                                        ${product.price}
                                      </p>
                                      <div className='flex items-center text-yellow-500'>
                                        <svg
                                          xmlns='http://www.w3.org/2000/svg'
                                          fill='none'
                                          viewBox='0 0 24 24'
                                          strokeWidth={1.5}
                                          stroke='currentColor'
                                          className='w-5 h-5'
                                        >
                                          <path
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            d='M12 17.25l4.5-4.5-4.5-4.5'
                                          />
                                        </svg>
                                        <span className='text-sm'>
                                          {product.rating.toFixed(1)}
                                        </span>
                                      </div>
                                    </div>

                                    <div className='flex items-center justify-between text-sm text-gray-500'>
                                      <p className='line-through'>
                                        ${product.discountPercentage}
                                      </p>
                                    </div>

                                    {product.deleted && (
                                      <div className='inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                                        deleted
                                      </div>
                                    )}
                                  </div>
                                </Link>
                                {/* buttons */}
                                <div className='absolute bottom-4 left-4 right-4 flex justify-between'>
                                  <Link
                                    to={`/admin/product/form/${product.id}`}
                                    className='flex justify-center items-center w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full text-white transition-colors duration-300'
                                    title='update'
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth={1.5}
                                      stroke='currentColor'
                                      className='w-6 h-6'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M16.862 4.487l1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                                      />
                                    </svg>
                                  </Link>

                                  <button
                                    onClick={() =>
                                      alert.error("You want to delete")
                                    }
                                    className='flex justify-center items-center w-12 h-12 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors duration-300'
                                    title='delete'
                                  >
                                    <svg
                                      xmlns='http://www.w3.org/2000/svg'
                                      fill='none'
                                      viewBox='0 0 24 24'
                                      strokeWidth={1.5}
                                      stroke='currentColor'
                                      className='w-6 h-6'
                                    >
                                      <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>

      {/* pagination */}
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <div
            onClick={() => paginationHandler(page > 1 ? page - 1 : page)}
            className='relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Previous
          </div>
          <div
            onClick={() =>
              paginationHandler(totalPage > page ? page + 1 : page)
            }
            className='relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Next
          </div>
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700'>
              Showing{" "}
              <span className='font-medium'>
                {" "}
                {(page - 1) * ITEM_PER_PAGE + 1}{" "}
              </span>{" "}
              to
              <span className='font-medium'>{page * ITEM_PER_PAGE}</span> of
              <span className='font-medium'>{totalProduct}</span> results
            </p>
          </div>

          <div>
            <nav
              aria-label='Pagination'
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
            >
              <div
                onClick={() => paginationHandler(page > 1 ? page - 1 : page)}
                className='relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Previous</span>
                <ChevronLeftIcon aria-hidden='true' className='h-5 w-5' />
              </div>

              {Array.from({length: totalPage}).map((element, index) => {
                return (
                  <div
                    key={index + 1}
                    onClick={() => paginationHandler(index + 1)}
                    aria-current='page'
                    className={`relative border-2 z-10 inline-flex cursor-pointer items-center ${
                      page === index + 1
                        ? "bg-indigo-600 text-white text-xl"
                        : "bg-white"
                    } px-4 py-2 text-sm font-semibold focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {index + 1}
                  </div>
                );
              })}

              <div
                onClick={() =>
                  paginationHandler(totalPage > page ? page + 1 : page)
                }
                className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only'>Next</span>
                <ChevronRightIcon aria-hidden='true' className='h-5 w-5' />
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default AdminProductList;

// filter =  { categoryName : ['electronics', 'cloths', 'toys']}
// sort = {_sort : 'fieldname', _order : 'desc/asc'}
