import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


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
const db = getFirestore(app);
const storage = getStorage(app);


const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const userName = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  let userData = {
    email: email,
    role: role
  };



  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    userData = {
      ...userData,
      name: name,
      userName: userName,
    };

    if (role === "admin") {
      const adminDocRef = doc(collection(db, "admin"), userCredential.user.uid);
      await setDoc(adminDocRef, userData);
    } else if (role === "teacher") {
      const teacherDocRef = doc(collection(db, "approve_Teacher"), userCredential.user.uid);

      const pictureFile = document.getElementById("teacherPicture").files[0];

      let pictureUrl = null;

      if (pictureFile) {
        const pictureRef = ref(storage, `teacherPictures/${email}-${Date.now()}`);

        await uploadBytes(pictureRef, pictureFile);

        pictureUrl = await getDownloadURL(pictureRef);

        userData = {
          ...userData,
          degree: document.getElementById("teacherDegree").value,
          experience: document.getElementById("teacherExperience").value,
          subject: document.getElementById("teacherSubject").value,
          picture: pictureUrl
        };
      }

      userData = {
        ...userData,
        picture: pictureUrl
      };

      await setDoc(teacherDocRef, userData);
    } else {
      const roleDocRef = doc(collection(db, "students"), userCredential.user.uid);
      await setDoc(roleDocRef, userData);
    }

    alert('Signup successful!');
    // window.location.href = "../Login/login.html";
  } catch (error) {
    console.error("Signup error:", error.message);
  }
});
