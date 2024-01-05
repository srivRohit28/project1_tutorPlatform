import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyA4fg_x-GFnD5TTsDJhdcgPzkiClfnpLh4",
  authDomain: "project1-1a12a.firebaseapp.com",
  databaseURL: "https://project1-1a12a-default-rtdb.firebaseio.com",
  projectId: "project1-1a12a",
  storageBucket: "project1-1a12a.appspot.com",
  messagingSenderId: "503658861390",
  appId: "1:503658861390:web:0ca201b7574cc71004041f",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Login successful:", userCredential.user);
      alert("Logged in!!");
      window.location.href = "../Dashboard/index.html";
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });

    getData();
});

// local Storage access

function getData() {
  // var email = document.getElementById("loginEmail");
  // var password = document.getElementById("loginPassword");

  let userData = {
    Email : document.getElementById("loginEmail").value,
    Password : document.getElementById("loginPassword").value
  }
  console.log('userData',userData);
  localStorage.setItem("userData", JSON.stringify(userData));

  // if (email == userData.Email) {
  //   if (password == userData.Password) {
  //     alert("login Successful.");
  //   }
  //   else{
  //     alert("Invalid Credentials!!");
  //   }
  // }
}
