import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

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
const storage = getStorage(app);

const signupForm = document.getElementById("signupForm");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const userName = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  console.log("Form values:", name, email, password, userName, role);

  let userData = {
    email: email,
    role: role,
  };

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log("User credentials:", userCredential.user.uid);

    userData = {
      ...userData,
      name: name,
      userName: userName,
    };

    await updateProfile(auth.currentUser, {
      displayName: name,
    });

    if (role === "admin") {
      const adminDocRef = await doc(
        collection(db, "admin"),
        userCredential.user.uid
      );
      await setDoc(adminDocRef, userData);
    } else if (role === "teacher") {
      const teacherDocRef = doc(
        collection(db, "approve_Teacher"),
        userCredential.user.uid
      );

      const pictureFile = document.getElementById("teacherPicture").files[0];

      let pictureUrl = null;

      if (pictureFile) {
        const pictureRef = ref(
          storage,
          `teacherPictures/${email}-${Date.now()}`
        );

        await uploadBytes(pictureRef, pictureFile);

        console.log("Picture uploaded");

        pictureUrl = await getDownloadURL(pictureRef);

        console.log("Picture URl:", pictureUrl);

        userData = {
          ...userData,
          degree: document.getElementById("teacherDegree").value,
          experience: document.getElementById("teacherExperience").value,
          subject: document.getElementById("teacherSubject").value,
          picture: pictureUrl,
        };
      }

      userData = {
        ...userData,
        picture: pictureUrl,
      };

      await setDoc(teacherDocRef, userData);

      console.log("Teacher document created");
    } else {
      const roleDocRef = doc(
        collection(db, "students"),
        userCredential.user.uid
      );
      await setDoc(roleDocRef, userData);
    }

    alert("Signup successful!");
    // window.location.href = "../Login/login.html";
  } catch (error) {
    console.error("Signup error:", error.message);
  }
});
