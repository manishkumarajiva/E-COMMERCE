export function fetchProduct() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/');
    const products = await response.json();
    resolve(products)
  }
  );
}
