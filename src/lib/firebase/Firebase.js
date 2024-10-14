import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyByQ0yaCGXgQ_vDCbBIqTCX020qtqcKCGg",
  authDomain: "tripwonder-63139.firebaseapp.com",
  projectId: "tripwonder-63139",
  storageBucket: "tripwonder-63139.appspot.com",
  messagingSenderId: "659188188065",
  appId: "1:659188188065:web:acd0bd3a302aa4922a41e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
