import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: REACT_FIREBASE_apiKey,
  authDomain: REACT_FIREBASE_authDomain,
  projectId: REACT_FIREBASE_projectId,
  storageBucket: REACT_FIREBASE_storageBucket,
  messagingSenderId: REACT_FIREBASE_messagingSenderId,
  appId: REACT_FIREBASE_appId,
  measurementId: REACT_FIREBASE_measurementId
};


// // Get a list of cities from your database
// async function getCities(db) {
//   const citiesCol = collection(db, 'cities');
//   const citySnapshot = await getDocs(citiesCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default getFirestore();