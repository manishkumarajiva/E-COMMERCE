export function getProductById(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8000/products/${id}`);
    const product = await response.json();
    resolve(product)
  }
  );
}


export function getCategory() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/category');
    const categories = await response.json();
    resolve(categories)
  }
  );
}

export function getBrand() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/brand');
    const brands = await response.json();
    resolve(brands)
  }
  );
}


export function getFilteredProduct(filter, sort, pagination) {

  let query = '';
  // FILTERS
  for (let key in filter) {
    const categoryValues = filter[key];

    if (categoryValues.length > 0) {
      console.log(categoryValues)
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
    const response = await fetch(`http://localhost:8000/products?${query}`);
    const products = await response.json();
    const totalProduct = await response.headers.get('X-Total-Count');
    resolve({ product: products, total: +totalProduct })
  }
  );
}




// filter =  { categoryName : ['electronics', 'cloths', 'toys']}
// sort = {_sort : 'fieldname', _order : 'desc/asc'}
// pagination = {_page : 1, _limit : 10}

// for (let key in filter) {
//   query += `${key}=${filter[key]}&`
// }