import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCXxUw82pKtu5oIZPg4IMnPq66dzabIrY",
  authDomain: "todo-app-152d8.firebaseapp.com",
  projectId: "todo-app-152d8",
  storageBucket: "todo-app-152d8.appspot.com",
  messagingSenderId: "777101931326",
  appId: "1:777101931326:web:4e8d35ddf5e2b0037af26f",
  measurementId: "G-17BQ8WW923"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);    