
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



export function signInUser(userCredential) {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userCredential)
  };

  return new Promise(async (resolve, reject) => {
    const response = await fetch('http://localhost:8000/user/', options);

    if (response.ok) {
      const user = await response.json();
      resolve(user);
      
    } else {
      const error = await response.json();
      reject(error);
    }}
  );
}


export function signOutUser() {
  return new Promise(async (resolve) => {
    resolve(null);
  }
  );
}







// ---------- JSON SERVER ------------- //

// export function updateUser(userData) {

//   const options = {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userData)
//   };

//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/user/' + userData.id, options);
//     const updatedResponse = await response.json();
//     resolve(updatedResponse)
//   }
//   );
// }



// export function signInUser(userCredential) {
//   const { email, password } = userCredential;

//   return new Promise(async (resolve) => {
//     const response = await fetch('http://localhost:8000/user?email=' + email);
//     const user = await response.json();

//     if (!(user.length > 0)) {
//       alert('user not found');
//       return
//     } else {
//       if (user[0].password !== password) {
//         alert('incorrect login credentials');
//         return;
//       }
//     }
//     resolve(user[0])
//   }
//   );
// }