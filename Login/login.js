import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyChaQ4bBC3eP21SHvolyQsKCYhoam-HGIw",
  authDomain: "sample-side-d8f69.firebaseapp.com",
  projectId: "sample-side-d8f69",
  storageBucket: "sample-side-d8f69.appspot.com",
  messagingSenderId: "161040903419",
  appId: "1:161040903419:web:50d0f5a9ae860f9ce6d45e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    localStorage.setItem("uid", userCredential.user.uid);

    window.location.href = "../StudentSection/Dashboard/dashboard.html";
  } catch (error) {
    console.error("Login error:", error.message);
  }
});
