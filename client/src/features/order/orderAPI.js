export function createOrder(order) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/order/', options);
    const newOrder = await response.json();
    resolve(newOrder)
  }
  );
}




export function fetchOrder(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/?userId=' + id);
    const items = await response.json();
    resolve(items)
  }
  );
}



export function fetchAllOrder(pagination) {
  let query = '';
    
  for(let key in pagination){
    query += `${key}=${pagination[key]}&`
  }

  
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/order/');
    const orders = await response.json();
    resolve(orders)
  }
  );
}


export function deleteCartItem(itemId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/' + itemId, options);
    const item = await response.json();
    resolve(item)
  }
  );
}


