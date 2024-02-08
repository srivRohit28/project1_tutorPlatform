import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


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
const db = getFirestore(app); 


const signupForm = document.getElementById("signupForm");

// event listener, form submission
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 
  
  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const userName = document.getElementById("username").value;
  const isTutor = document.getElementById("ifTeacher").checked;

  try {
    // user creation, email and password, firebase authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // database creation, basis of user
    if (isTutor) {
      await addDoc(collection(db, "Tutors"), {
        userId: user.uid,
        email: email,
        name: name,
        user: userName,
      });
    } else {
      await addDoc(collection(db, "Students"), {
        userId: user.uid,
        email: email,
        
      });
    }

    
    window.location.href = "../Login/login.html";
  } catch (error) {
    console.error("Signup error:", error.message);
  }
});
