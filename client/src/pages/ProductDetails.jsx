import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import ProductDetail from '../features/product/components/productDetail';
import Footer from '../features/common/Footer';
const ProductDetails = () => {
  return (
    <Fragment>
        <Navbar>
            <ProductDetail></ProductDetail>
        </Navbar>
        <Footer></Footer>
    </Fragment>
  )
}

export default ProductDetails
