import { API } from "../../app/constants";

export function addToCart(item) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/`, options);
    const item = await response.json();
    resolve(item)
  }
  );
}

export function fetchCartItems(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/${id}`);
    const items = await response.json();
    resolve(items)
  }
  );
}

export function updateCartItem(item) {

  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity : item.quantity })
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/${item.id}`, options);
    if(response.ok){
      const updatedItem = await response.json();
      resolve({...item.product, quantity : item.quantity});
    }
  }
  );
}

export function deleteCartItem(itemId) {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/` + itemId, options);
    const item = await response.json();
    resolve(item)
  }
  );
}

export function resetCartItem(userId) {
  return new Promise(async (resolve) => {
    const cartItems = await fetchCartItems(userId);

    for (let item of cartItems) {
      await deleteCartItem(item.id);
    }
    resolve({ status: 'fulfilled' })
  }
  );
}
