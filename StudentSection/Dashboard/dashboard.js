import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4fg_x-GFnD5TTsDJhdcgPzkiClfnpLh4",
  authDomain: "project1-1a12a.firebaseapp.com",
  databaseURL: "https://project1-1a12a-default-rtdb.firebaseio.com",
  projectId: "project1-1a12a",
  storageBucket: "project1-1a12a.appspot.com",
  messagingSenderId: "503658861390",
  appId: "1:503658861390:web:0ca201b7574cc71004041f",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Authentication instance

// Function to display user name and email
function displayUserInfo(user) {
  if (user) {
    const displayName = user.displayName;
    const email = user.email;

    // Update HTML elements with user information
    document.querySelector("#user-name").textContent = displayName;
    document.querySelector("#user-email").textContent = email;
  } else {
    // User is not logged in, clear the information
    document.querySelector("#user-name").textContent = "";
    document.querySelector("#user-email").textContent = "";
  }
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  // Call the function to display user information
  displayUserInfo(user);
});
