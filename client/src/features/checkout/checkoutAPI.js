
export function fetchCount() {
  const options = {
    method : 'GET',
    headers : { "Content-Type" : "application/json" },
    credentials : 'include'
  }
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/', options);
    const data = await response.json();
    resolve(data)
  }
  );
}
