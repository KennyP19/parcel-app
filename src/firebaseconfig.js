// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyClja_KI6Dpf8NDV4fJY57jm5HtydyUIZY",
  authDomain: "parcel-app-7cd6e.firebaseapp.com",
  projectId: "parcel-app-7cd6e",
  storageBucket: "parcel-app-7cd6e.appspot.com",
  messagingSenderId: "857416029848",
  appId: "1:857416029848:web:e0ec5bcf17acd09aa7a2ed",
  measurementId: "G-F4RT89VGML"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app