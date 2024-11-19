
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


export function updateUser(userData) {

  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  };

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/user/' + userData.id, options);
    const updatedResponse = await response.json();
    resolve(updatedResponse)
  }
  );
}



export function signIn(userCredential) {
  const { email, password } = userCredential;

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8000/user?email=' + email);
    const user = await response.json();

    if (!(user.length > 0)) {
      alert('user not found');
      return
    } else {
      if (user[0].password !== password) {
        alert('incorrect login credentials');
        return;
      }
    }
    resolve(user[0])
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



// fetch current logged in user

export function signInUser() {

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
  return new Promise(async (resolve) => {
    resolve(null);
  }
  );
}
