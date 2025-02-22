const { API } = require('../../app/constants');


export function SignUpUser(userData) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials : 'include',
    body: JSON.stringify(userData)
  };

  return new Promise(async (resolve) => {
    const response = await fetch(`${API}/auth/signup`, options);
    
    if(response.ok){
      const newUserData = await response.json();
      resolve(newUserData)
    }else{
      const { status, statusText } = response;
      resolve({status, statusText, success : false, message : 'Already Exist', response : null})
    }
  }
  );
}


export function SignInUser(userCredential) {

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials : 'include',
    body: JSON.stringify(userCredential)
  };

  return new Promise(async (resolve, reject) => {
    const response = await fetch(`${API}/auth/signin`, options);

    if (response.ok) {
      const user = await response.json();
      resolve(user);
    } else {
      const { status, statusText, ok } = response;
      resolve({status, message : statusText, success : ok})
    }}
  );
}


export function SignOutUser() {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials : 'include'
  };

  return new Promise(async (resolve) => {

    const response = await fetch(`${API}/auth/logout`, options);

    if (response.ok) {
      const user = await response.json();
      resolve(user.login);
    }
})
}



export function CheckAuth() {
  const options = {
    method : 'GET',
    credentials : 'include',
    headers : {'Content-Type' : 'application/json'}
  }

  return new Promise(async(resolve) => {
    const response = await fetch(`${API}/auth/checkAuth`, options);
    const user = await response.json();
    resolve(user);
  })
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