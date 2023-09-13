import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDUNvLmXpZwQDNLmJrsigdEqGfuTv9D1IQ",
//   authDomain: "hiring-website-2a7e3.firebaseapp.com",
//   projectId: "hiring-website-2a7e3",
//   storageBucket: "hiring-website-2a7e3.appspot.com",
//   messagingSenderId: "144686661034",
//   appId: "1:144686661034:web:62c7d2baecd690f460bfd3",
//   measurementId: "G-KQEDT4LLT2"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBCG0WQYdw6dzHY8Welden0aUYJ0qbt4-I",
  authDomain: "pmo-hiring.firebaseapp.com",
  projectId: "pmo-hiring",
  storageBucket: "pmo-hiring.appspot.com",
  messagingSenderId: "18575137242",
  appId: "1:18575137242:web:7885d32b00800c904948e3",
  measurementId: "G-Y5S15H4M45"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
