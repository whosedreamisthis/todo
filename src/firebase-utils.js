import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB2eNoXl4ovUBAeC5B3cgQQ8wm2LtL8H60",
  authDomain: "todo-9d0b1.firebaseapp.com",
  projectId: "todo-9d0b1",
  storageBucket: "todo-9d0b1.appspot.com",
  messagingSenderId: "535209521691",
  appId: "1:535209521691:web:a564834464e518d8cf3ebe",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signOutOfGoogle = () => signOut(auth);

export const db = getFirestore(firebaseApp);

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {};

export const addTodoToDatabase = async (user, todos) => {
  await setDoc(doc(db, "todos", user.uid), {
    name: "todos",
    todos,
  });
};

export const getTodoListFromDatabase = async (user) => {
  const docRef = doc(db, "todos", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().todos;
  } else {
    console.log("No such document.");
    return null;
  }
};
export const editTodoList = async (user, todos) => {
  const docRef = doc(db, "todos", user.uid);
  await updateDoc(docRef, {
    todos,
  });
};

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  //if user data exists

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};
