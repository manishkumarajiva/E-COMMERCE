export function getLoggedInUser(id){
  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8000/user/${id}`);
    const user = await response.json();
    resolve(user)
  })
}


export function getUserOrder(userId){
  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8000/order/?user=${userId}`);
    const user = await response.json();
    resolve(user[0])
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


export function checkUser(userInfo) {
  const { email, password } = userInfo;
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8000/user?email='+email);
    const user = await response.json();
    if(!(user.length > 0)) alert('not found')
    if(!user[0].password === password) alert('password')
    resolve(user[0])
  }
  );
}


