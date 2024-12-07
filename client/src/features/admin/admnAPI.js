export function getLoggedInUser(id){
  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8000/user/${id}`);
    const user = await response.json();
    resolve(user)
  })
}


export function createUser(userData) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({...userData, address : []})
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/user/', options);
    const newUserData = await response.json();
    resolve(newUserData)
  }
  );
}


export function updateUser(userData) {

  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };
  
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/user/'+ userData.id, options);
    const updatedResponse = await response.json();
    resolve(updatedResponse)
  }
  );
}




