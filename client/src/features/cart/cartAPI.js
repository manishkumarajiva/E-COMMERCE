// functions for handling async API

export function addToCart(item) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/', options);
    const item = await response.json();
    resolve(item)
  }
  );
}




export function fetchCartItems(id) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/?userId=' + id);
    const items = await response.json();
    resolve(items)
  }
  );
}




export function updateCartItem(item) {

  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/cart/' + item.id, options);
    const updatedItem = await response.json();
    resolve(updatedItem)
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
