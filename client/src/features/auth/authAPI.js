
export function createUser(userData) {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/user/', options);
    const newUserData = await response.json();
    resolve(newUserData)
  }
  );
}




export function checkUser(userInfo) {
  const { email, password } = userInfo;
  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8000/user?email='+email);
    const user = await response.json();

    if(!(user.length > 0)) reject({message : "User not found"});
    if(!user[0].password === password) reject({message : "incorrect password" });
    resolve(user[0])
  }
  );
}



export function signInUser(userCredential) {

  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/', options);
    const newUserData = await response.json();
    resolve(newUserData)
  }
  );
}


export function signOutUser() {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/', options);
    const newUserData = await response.json();
    resolve(newUserData)
  }
  );
}
