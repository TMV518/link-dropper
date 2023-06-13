// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCX7IJqzx5F8GA7IkKGaYdwY7PAyixEfW8",
  authDomain: "link-dropper.firebaseapp.com",
  projectId: "link-dropper",
  storageBucket: "link-dropper.appspot.com",
  messagingSenderId: "79532978819",
  appId: "1:79532978819:web:65ae31dcfa8b2700dc61b6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

//set up authorization
export const auth = getAuth(app);

//used for image storage
const storage = getStorage(app);
export const storageRef = ref(storage);
