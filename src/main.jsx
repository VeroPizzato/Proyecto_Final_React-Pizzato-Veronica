import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB425GCOith2IQqQ10MVPxW3BqB45OKcPU",
  authDomain: "new-computers-firebase.firebaseapp.com",
  projectId: "new-computers-firebase",
  storageBucket: "new-computers-firebase.appspot.com",
  messagingSenderId: "1041178617185",
  appId: "1:1041178617185:web:502767970b3b42f655d120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
