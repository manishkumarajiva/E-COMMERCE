import { API } from '../../app/constants';

export function getLoggedInUser(){
  return new Promise(async(resolve) => {
    const response = await fetch(`${API}/user/`);
    const user = await response.json();
    resolve(user)
  })
}


export function updateUser(userData) {

  const options = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };
  
  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/user`, options);
    const updatedResponse = await response.json();
    resolve(updatedResponse)
  }
  );
}








