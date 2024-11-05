import React, {Fragment} from 'react'
import Navbar from '../features/navbar/Navbar';
import ProductList from '../features/product/components/ProductList';

const Home = () => {
  return (
    <Fragment>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </Fragment>
  )
}

export default Home
