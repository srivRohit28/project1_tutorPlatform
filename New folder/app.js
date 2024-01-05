// Initialize Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4fg_x-GFnD5TTsDJhdcgPzkiClfnpLh4",
  authDomain: "project1-1a12a.firebaseapp.com",
  databaseURL: "https://project1-1a12a-default-rtdb.firebaseio.com",
  projectId: "project1-1a12a",
  storageBucket: "project1-1a12a.appspot.com",
  messagingSenderId: "503658861390",
  appId: "1:503658861390:web:0ca201b7574cc71004041f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
  
  // Example function to fetch tutors
  function fetchTutors() {
    db.collection("tutors").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        // Handle the fetched data (e.g., display it on the webpage)
      });
    });
  }
  
  // Example function to add a new tutor
  function addTutor(name, subject, email) {
    db.collection("tutors").add({
      name: name,
      subject: subject,
      email: email
    })
    .then((docRef) => {
      console.log("Tutor added with ID: ", docRef.id);
      // Handle success (e.g., show a success message)
    })
    .catch((error) => {
      console.error("Error adding tutor: ", error);
      // Handle errors (e.g., show an error message)
    });
  }
  
  // You can create more functions to handle various aspects of the platform
  
  // Example usage:
  // fetchTutors(); // Call this function to fetch tutors
  // addTutor("John Doe", "Math", "john@example.com"); // Call this function to add a tutor
  