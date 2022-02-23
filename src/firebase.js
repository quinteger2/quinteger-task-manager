import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
import {
  getDocs,
  onSnapshot,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  Timestamp,
  docRef,
} from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
  measurementId: process.env.REACT_APP_FIREBASE_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

export const getTasks = async (_items) => {
  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    const currentTask = {};

    currentTask.id = doc.data().id;
    currentTask.content = doc.data().content;
    currentTask.date = new Date(doc.data().date.seconds * 1000); //need to get the date from Firestore's format into a proper date object
    currentTask.group = doc.data().group;
    currentTask.person = doc.data().person;
    currentTask.percentComplete = doc.data().percentComplete;
    _items.push(currentTask);
  });
};

export const getGroups = async (groups, groupsWithTasks) => {
  const firestoreGroups = [];

  const querySnapshot = await getDocs(collection(db, "tasks"));
  querySnapshot.forEach((doc) => {
    firestoreGroups.push(doc.data().group);
    groupsWithTasks.push({group: doc.data().group, id: doc.data().id, content: doc.data().content});
  });

  let dedupedGroups = new Set(firestoreGroups);
  console.log(groupsWithTasks.sort((a,b) => {
    return a.group > b.group
  }))
  
  dedupedGroups.forEach((group) => {
    groups.push(group);
  });
};

export const writeData = async (newTask) => {
  //if you want an auto generated id
  //const docRef = await addDoc(collection(db, "tasks"), docData);
  //console.log("Document written with ID: ", docRef.id);

  //If you want to set the id yourself
  await setDoc(doc(db, "tasks", newTask.id), newTask);
};

export const updateTask = async (
  id,
  _content,
  _date,
  _group,
  _person,
  _percentComplete,
  changeWriteState
) => {
  const ref = doc(db, "tasks", id);
  try {
    await updateDoc(ref, {
      content: _content,
      date: new Date(_date),
      group: _group,
      person: _person,
      percentComplete: _percentComplete,
    }).then(changeWriteState("success"));
  } catch (e) {
    changeWriteState("error");
  }
};

export const updateDate = async (id, newDate) => {
  const ref = doc(db, "tasks", id);
  await updateDoc(ref, {
    date: newDate,
  });
};
