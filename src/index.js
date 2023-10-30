import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
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

const tester = document.querySelector('.signup')
tester.addEventListener('submit', (e) => {
  e.preventDefault();


  const email = tester.email.value;
  const password = tester.password.value;

  if(!(email.toString().includes("ucsc.edu"))){
    alert("Email doesn't contain ucsc.edu")
  }else{
    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log('user created: ', cred.user);
      tester.reset();
    }).catch((err) => {
      alert(err.message);
    })
  }
})

const testLogin = document.querySelector('.login');
testLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = testLogin.email.value
  const password = testLogin.password.value

  signInWithEmailAndPassword(auth, email, password).then((cred) => {
    console.log('user logged in: ', cred.user);
    testLogin.reset();
  }).catch((err) => {
    alert(err.message)
  })

})

const testLogout = document.querySelector('.logout');
testLogout.addEventListener('click', (e) => {
  signOut(auth).then(() => {
    console.log('the user is signed out');
  }).catch((err) => {
    alert(err.message);
  })
})