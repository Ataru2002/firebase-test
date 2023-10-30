import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc } from 'firebase/firestore'
import {
  getAuth
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD4wXD7GzM1vAq3rsbhW83n74XWv6UretM",
  authDomain: "testinga-42bd7.firebaseapp.com",
  projectId: "testinga-42bd7",
  storageBucket: "testinga-42bd7.appspot.com",
  messagingSenderId: "283364257562",
  appId: "1:283364257562:web:8704a738ec408b874206a3",
  measurementId: "G-6CZTF38ZWS",
};

initializeApp(firebaseConfig);
const db = getFirestore()
const dbref = collection(db, 'Users');
const auth = getAuth();


getDocs(dbref).then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data()});
    })
    console.log(books);
})

const tester = document.getElementsById('loginbt')
tester.addEventListener('click', () => {
  
})