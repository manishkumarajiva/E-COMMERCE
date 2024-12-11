import {Fragment, useEffect} from "react";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import { useAlert } from "react-alert";

import {
  categoryList,
  brandList,
  updateProductAsync,
} from "../../product/productSlice";
//

import {createProductAsync} from "../../product/productSlice";
import {productDetail, getProductAsync} from "../../product/productSlice";
import {useParams} from "react-router-dom";

function AdminProductForm() {

  const alert = useAlert();

  const dispatch = useDispatch();
  const params = useParams();

  const product = useSelector(productDetail);
  const categories = useSelector(categoryList);
  const brands = useSelector(brandList);

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const onSubmit = (data) => {
    if (+params.id && product) {
      // update priduct based on Product ID
      const product = {...data};
      product.images = [
        product["image-1"],
        product["image-2"],
        product["image-3"],
        product["image-4"],
      ];
      delete product["image-1"];
      delete product["image-2"];
      delete product["image-3"];
      delete product["image-4"];
      product.price = +product.price;
      product.discountPercentage = +product.discountPercentage;
      product.rating = 0;
      dispatch(updateProductAsync(product));
      alert.success('Update Successfully')

      // BELOW: CODE IS FOR --- NEW PRODUCT
    } else {
      const product = {...data};
      delete product.id;
      product.images = [
        product["image-1"],
        product["image-1"],
        product["image-1"],
        product["image-1"],
      ];
      product.rating = product.rating || 0;
      delete product["image-1"];
      delete product["image-2"];
      delete product["image-3"];
      delete product["image-4"];

      dispatch(createProductAsync(product));
      alert.success('Product Added Successfully 👍')
    }
  };

  // get product by id
  useEffect(() => {
    if (+params.id) {
      dispatch(getProductAsync(params.id));
    }
  }, [dispatch, params.id]);

  // set product details during editing
  useEffect(() => {
    if (+params.id && product) {
      setValue('id', product?.id);
      setValue("title", product?.title);
      setValue("description", product?.description);
      setValue("category", product?.category);
      setValue("brand", product?.brand);
      setValue("price", product?.price);
      setValue("discountPercentage", product?.discountPercentage);
      setValue("stock", product?.stock);
      setValue("image-1", product?.images[0]);
      setValue("image-2", product?.images[1]);
      setValue("image-3", product?.images[2]);
      setValue("image-4", product?.images[3]);
      setValue("thumbnail", product?.thumbnail);
    }
  }, [params.id, product, setValue]);

  return (
    <Fragment>
      <div className='border-2 border-gray-200 sm:w-1/1 md:w-1/1 lg:w-4/5 mx-auto p-5'>
        <h2 className='text-base/7 font-semibold text-gray-900'>
          {" "}
          New Product Details
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-10 grid gap-x-6 gap-y-4 grid-rows-1 grid-cols-1'
        >
          <div>
            <div className='mt-2'>
              <input id='id' type='hidden' {...register("id")}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label
              htmlFor='title'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Product Name
            </label>
            <div className='mt-2'>
              <input
                id='title'
                type='text'
                {...register("title", {
                  required: "Product name is required",
                })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["title"] && (
                <p className='text-red-500 text-sm'>
                  {errors["title"].message}
                </p>
              )}
            </div>
          </div>

          {/* Product Description */}
          <div>
            <label
              htmlFor='description'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Product Description
            </label>
            <div className='mt-2'>
              <textarea
                id='description'
                {...register("description", {
                  required: "Product description is required",
                })}
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["description"] && (
                <p className='text-red-500 text-sm'>
                  {errors["description"].message}
                </p>
              )}
            </div>
          </div>

          <div className='grid grid-rows-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-20'>
            {/* Category */}
            <div>
              <label
                htmlFor='category'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Category
              </label>
              <div className='mt-2'>
                <select
                  id='category'
                  {...register("category", {required: "Category is required"})}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6'
                >
                  <option value=''>Select Category</option>
                  {categories &&
                    categories.map((cateogry) => (
                      <option value={cateogry.value}> {cateogry.label} </option>
                    ))}
                </select>
                {errors["category"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["category"].message}
                  </p>
                )}
              </div>
            </div>

            {/* Brand */}
            <div>
              <label
                htmlFor='brand'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Brand
              </label>
              <div className='mt-2'>
                <select
                  id='brand'
                  {...register("brand", {required: "Brand is required"})}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm/6'
                >
                  <option value=''>Select Brand</option>
                  {brands &&
                    brands.map((brand) => (
                      <option value={brand.value}> {brand.label} </option>
                    ))}
                </select>
                {errors["brand"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["brand"].message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor='price'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Price
            </label>
            <div className='mt-2'>
              <input
                id='price'
                {...register("price", {required: "Price is required"})}
                type='number'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["price"] && (
                <p className='text-red-500 text-sm'>
                  {errors["price"].message}
                </p>
              )}
            </div>
          </div>

            {/* Discount Percentage */}
            <div>
            <label
              htmlFor='price'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Price
            </label>
            <div className='mt-2'>
              <input
                id='discountPercentage'
                {...register("discountPercentage", {required: "discountPercentage is required"})}
                type='number'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["discountPercentage"] && (
                <p className='text-red-500 text-sm'>
                  {errors["discountPercentage"].message}
                </p>
              )}
            </div>
          </div>

          {/* Discount Price */}
          <div>
            <label
              htmlFor='discountPrice'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Discount
            </label>
            <div className='mt-2'>
              <input
                id='discountPrice'
                {...register("discountPrice", {
                  required: "discountPrice is required",
                })}
                type='number'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["discountPrice"] && (
                <p className='text-red-500 text-sm'>
                  {errors["discountPrice"].message}
                </p>
              )}
            </div>
          </div>

          {/* Stock */}
          <div>
            <label
              htmlFor='stock'
              className='block text-sm/6 font-medium text-gray-900'
            >
              Stock
            </label>
            <div className='mt-2'>
              <input
                id='stock'
                {...register("stock", {required: "Stock is required"})}
                type='number'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
              />
              {errors["stock"] && (
                <p className='text-red-500 text-sm'>
                  {errors["stock"].message}
                </p>
              )}
            </div>
          </div>

          {/* Image URLs */}
          <section>
            <div>
              <label
                htmlFor='image-1'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Image 1 URL
              </label>
              <div className='mt-2'>
                <input
                  id='image-1'
                  {...register("image-1", {required: "Image URL is required"})}
                  type='url'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                />
                {errors["image-1"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["image-1"].message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='image-1'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Image 2 URL
              </label>
              <div className='mt-2'>
                <input
                  id='image-2'
                  {...register("image-2", {required: "Image URL is required"})}
                  type='url'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                />
                {errors["image-2"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["image-2"].message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='image-3'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Image 3 URL
              </label>
              <div className='mt-2'>
                <input
                  id='image-3'
                  {...register("image-3", {required: "Image URL is required"})}
                  type='url'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                />
                {errors["image-3"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["image-3"].message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='image-4'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Image 4 URL
              </label>
              <div className='mt-2'>
                <input
                  id='image-4'
                  {...register("image-4", {required: "Image URL is required"})}
                  type='url'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                />
                {errors["image-4"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["image-4"].message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor='thumbnail'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Thumbnail
              </label>
              <div className='mt-2'>
                <input
                  id='thumbnail'
                  {...register("thumbnail", {
                    required: "Image URL is required",
                  })}
                  type='url'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6'
                />
                {errors["thumbnail"] && (
                  <p className='text-red-500 text-sm'>
                    {errors["thumbnail"].message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Submit Button */}
          <button
            type='submit'
            className='mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md'
          >
            Add Product
          </button>
        </form>
      </div>
    </Fragment>
  );
}

export default AdminProductForm;
