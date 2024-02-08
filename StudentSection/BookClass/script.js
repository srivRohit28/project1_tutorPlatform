import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
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
const db = getFirestore(app); // Get Firestore instance


async function displayRegisteredTutors() {
  const tutorsRef = collection(db, "Tutors");
  const querySnapshot = await getDocs(tutorsRef);

  
  const tableBody = document.querySelector("#tut-list tbody");

  
  tableBody.innerHTML = "";

   
  let serialNumber = 1;

  querySnapshot.forEach((doc) => {
    const tutorData = doc.data();
    const tutorName = tutorData.name; // Assuming the tutor's name is stored in a field named 'name'

    // Create a new row in the table
    const newRow = document.createElement("tr");

    // Add serial number column
    const serialColumn = document.createElement("td");
    serialColumn.textContent = serialNumber;
    newRow.appendChild(serialColumn);

    // Add tutor name column
    const nameColumn = document.createElement("td");
    nameColumn.textContent = tutorName;
    newRow.appendChild(nameColumn);

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Increment serial number for the next tutor
    serialNumber++;
  });
}

// Call the function to display registered tutors when the page loads
window.addEventListener("load", () => {
  displayRegisteredTutors();
});
