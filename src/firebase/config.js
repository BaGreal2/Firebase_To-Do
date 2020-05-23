import firebase from 'firebase';
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBLqNprQbBZr-hBTIM-MMnU4-rraHrUFmk",
    authDomain: "fir-01-586a4.firebaseapp.com",
    databaseURL: "https://fir-01-586a4.firebaseio.com",
    projectId: "fir-01-586a4",
    storageBucket: "fir-01-586a4.appspot.com",
    messagingSenderId: "706438128473",
    appId: "1:706438128473:web:eca442395a226232c2e248",
    measurementId: "G-DDYVPSVNF0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const auth = firebase.auth()
const db = firebase.firestore()
  export{auth, db}
