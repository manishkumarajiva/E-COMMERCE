import { API } from "../../app/constants";

export function addToCart(item) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/`, options);
    const cartItems = await response.json();
    resolve(cartItems)
  }
  );
}

export function fetchCartItems(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/cart/${id}`);
    const cartItems = await response.json();
    resolve(cartItems)
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
      const cartItems = await response.json();
      resolve(cartItems);
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
    const cartItems = await response.json();
    resolve(cartItems)
  }
  );
}

export function resetCartItem(userId) {
  return new Promise(async (resolve) => {
    const cartItems = await fetchCartItems(userId);

    for (let item of cartItems.response) {
      await deleteCartItem(item.id);
    }
    resolve({ status: 'fulfilled' })
  }
  );
}
