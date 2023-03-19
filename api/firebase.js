import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDocs, getDoc, query, where } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyCzwEvHy6hWz0mDEFdy-a5cgmjBmi7sNZw",
  authDomain: "vanlife-7c02e.firebaseapp.com",
  projectId: "vanlife-7c02e",
  storageBucket: "vanlife-7c02e.appspot.com",
  messagingSenderId: "923159170122",
  appId: "1:923159170122:web:96dbd57934e1d61f41eab3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// reference of the entire collection on db
const vansCollectionRef = collection(db, "vans");

export async function getAllVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr;
}

export async function getVan(id) {
  // reference of the single document on db
  const docRef = doc(db, "vans", id);
  const vanSnapShot = await getDoc(docRef);
  return {
    ...vanSnapShot.data(),
    id: vanSnapShot.id
  };
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where("hostId", "==", "123"))
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id
  }))
  return dataArr;
}