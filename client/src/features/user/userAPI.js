import { API } from '../../app/constants';

export function getLoggedInUser(id){
  return new Promise(async(resolve) => {
    const response = await fetch(`${API}/user/${id}`);
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





