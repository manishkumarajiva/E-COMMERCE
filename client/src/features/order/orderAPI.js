import { API } from "../../app/constants";


export function createOrder(order) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(order)
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/order/`, options);
    const newOrder = await response.json();
    resolve(newOrder)
  }
  );
}


export function getUserOrder(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/order/${id}`);
    const items = await response.json();
    console.log(items, response)
    resolve(items)
  }
  );
}


export function updateOrderStatus(order) {
  const options = {
    method : 'PATCH',
    headers : { 'Content-Type' : 'application/json'},
    body : JSON.stringify(order)
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/order/` + order.id, options);
    const item = await response.json();
    resolve(item)
  }
  );
}


export function fetchAllOrder(pagination, sort) {
  let query = '';
    
  for(let key in pagination){
    query += `${key}=${pagination[key]}&`
  }

  for(let key in sort){
    query += `${key}=${sort[key]}&`
  }

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/order/?` + query);
    const orders = await response.json();
    const totalOrder = await response.headers.get('X-Total-Count')
    resolve({order : orders, total : +totalOrder})
  }
  );
}


export function deleteOrder(orderId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/order/` + orderId, options);
    const item = await response.json();
    resolve(item)
  }
  );
}


