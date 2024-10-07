import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import { auth }  from "./utils/FirebaseManager";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";

function App() {
  const [formData, setFormData] = useState({email: "", password: "",});
  let navigate = useNavigate();

  const onRegister = (e) => {
    e.preventDefault();
    console.log(formData);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
      // ..
    });
  }

  const onLogin = (e) => {
    e.preventDefault();
    console.log(formData);

    signInWithEmailAndPassword(auth, formData.email, formData.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }

  const onCheck = (e) => {
    // auth.getAuth()

    // just in case
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
      const emailVerified = user.emailVerified;

      // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      const uid = user.uid;

      console.log(displayName, email, photoURL, emailVerified, uid)
      navigate("/chat");
    }
  }
  const onSignOut = (e) => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      console.log(error)
    });
  }

  return (
    <>
        <label>
          Email:
          <input type="text" name="email" value={formData.email} onChange={(e) => {
            setFormData((prevState) => ({...prevState, email: e.target.value})
          )}} />
        </label>
        <br/>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={(e) => {
            setFormData((prevState) => ({...prevState, password: e.target.value})
          )}} />
        </label>
        <br />
        <input type="submit" value="Login" onClick={onLogin} />
        <br />
        <input type="submit" value="Register" onClick={onRegister} />
        <br />
        <input type="submit" value="Check Auth" onClick={onCheck} />
        <br />
        <input type="submit" value="Sign Out" onClick={onSignOut} />
    </>
  )
}

export default App
