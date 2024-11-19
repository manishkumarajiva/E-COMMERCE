import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/product/components/ProductList';
import Footer from '../features/common/Footer';

const Home = () => {
  return (
    <Fragment>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
        <Footer></Footer>
    </Fragment>
  )
}

export default Home
