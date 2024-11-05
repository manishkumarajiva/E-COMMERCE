import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import ProductDetail from '../features/product/components/productDetail';

const ProductDetails = () => {
  return (
    <Fragment>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
    </Fragment>
  )
}

export default ProductDetails
