
import { API } from '../../app/constants'

export function createProduct(product) {

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }

  return new Promise(async(resolve) =>{
    const product = await fetch('http://localhost:8000/products/', options);
    const response = await product.json();
    resolve(response);
  })

}

export function getProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const product = await response.json();
    resolve(product)
  }
  );
}

export function getFilteredProduct(filter, sort, pagination) {

  let query = '';
  // FILTERS
  for (let key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      const lastCategory = categoryValues[categoryValues.length - 1];
      query += `${key}=${lastCategory}&`
    }
  }

  // SORT
  for (let key in sort) {
    query += `${key}=${sort[key]}&`
  }

  for (let key in pagination) {
    query += `${key}=${pagination[key]}&`
  }


  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/product?${query}`);
    const products = await response.json();
    const totalProduct = await response.headers.get('X-Total-Count');
    resolve({ product: products, total: +totalProduct })
  }
  );
}

export function updateProduct(product) {

  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  }

  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products/'+product.id, options);
    const products = await response.json();
    resolve(products);
  })

}

export function deleteProduct(product) {

  const options = {
    method: "PATCH",
    headers: {  "Content-Type": "application/json"  },
    body: JSON.stringify(product)
  }

  return new Promise(async(resolve) =>{
    const response = await fetch('http://localhost:8000/products/' +product.id, options);
    const newproduct = await response.json();
    resolve(newproduct);
  })

}





export function getCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/category`);
    const categories = await response.json();
    resolve(categories.response)
  }
  );
}

export function getBrand() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/brand`);
    const brands = await response.json();
    resolve(brands.response)
  }
  );
}






// filter =  { categoryName : ['electronics', 'cloths', 'toys']}
// sort = {_sort : 'fieldname', _order : 'desc/asc'}
// pagination = {_page : 1, _limit : 10}

// for (let key in filter) {
//   query += `${key}=${filter[key]}&`
// }