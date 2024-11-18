import React, {useState, Fragment, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import { ITEM_PER_PAGE } from "../../../app/constants";
import Pagination from "../../common/Pagination";

import {
  getFilteredProductList,
  getCategoryList,
  getBrandList,
} from "../productSlice";

import {
  selectAllProduct,
  totalProducts,
  categoryList,
  brandList,
} from "../productSlice";

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

function ProductList() {
  const dispatch = useDispatch();
  const categories = useSelector(categoryList);
  const brands = useSelector(brandList);
  const products = useSelector(selectAllProduct);
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
                <div className='lg:col-span-3'>
                  {
                    <div className='bg-white'>
                      <div className='mx-auto max-w-2xl px-0 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                        <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                          Products
                        </h2>

                        <div className='mt-5 grid grid-cols-1 gap-x-3 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                          {/* products */}
                          {products &&
                            products.map((product) => (
                              <div
                                key={product.id}
                                className='group relative border-2 p-2 hover:shadow-lg150'
                              >
                                <Link to={`/product_details/${product.id}`}>
                                  <div className='bg-slate-300'>
                                    <img
                                      alt={product.imageAlt}
                                      src={product.thumbnail}
                                      className='h-full'
                                    />
                                  </div>

                                  <div>
                                    <div className='flex justify-between'>
                                      <p className='text-sm text-gray-700'>
                                        {product.category}
                                      </p>
                                      <p className='text-sm text-gray-500'>
                                        ${product.price}
                                      </p>
                                    </div>
                                    <div className='flex justify-between'>
                                      <div>
                                        <p className='text-sm text-gray-700'>
                                          {product.rating.toFixed(1)}
                                        </p>
                                      </div>
                                      <p className='text-sm text-gray-700 line-through'>
                                        ${product.discountPercentage}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            ))}
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
     <Pagination page={page} totalPage={totalPage} totalProduct={totalProduct} paginationHandler={paginationHandler}></Pagination>
    </Fragment>
  );
}

export default ProductList;

// filter =  { categoryName : ['electronics', 'cloths', 'toys']}
// sort = {_sort : 'fieldname', _order : 'desc/asc'}
