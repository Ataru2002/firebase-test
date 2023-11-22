import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, setDoc, addDoc } from 'firebase/firestore'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword
} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD27TM9fL2ADBIc_SD5owjkgpTZANgIwCA",
  authDomain: "testingapp-e54f0.firebaseapp.com",
  projectId: "testingapp-e54f0",
  storageBucket: "testingapp-e54f0.appspot.com",
  messagingSenderId: "352040451898",
  appId: "1:352040451898:web:5e57b01a43ddaac09f1a03",
  measurementId: "G-GC81KQQVCN",
};

initializeApp(firebaseConfig);
const db = getFirestore()
const majorRef = collection(db, 'Majors');
const coursesRef = collection(db, "Courses");
const auth = getAuth();

/*
getDocs(dbref).then((snapshot) => {
    let books = []
    snapshot.docs.forEach((doc) => {
        books.push({...doc.data()});
    })
    console.log(books);
})
*/
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

let contents = '';
document
  .getElementById("fileInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
      contents = event.target.result;
      document.getElementById("fileContent").textContent = contents;
      let test = contents.split("\r\n");
      for(let i = 0; i < test.length; i++){
        test[i] = test[i].replace("Current Major: ", "");
      }

      let splitter = [];
      for (let i = 0; i < test.length; i++) {
        splitter.push(test[i].split(" - "));
      }
      splitter.forEach((instance) => {
        addDoc(majorRef, {
          code: instance[0],
          fullName: instance[1]
        }).then(() => {
          console.log("added successfully");
        })
      });
    };
    reader.readAsText(file);
  });



const drop = document.getElementById("dropdown");
const classCodes = {};
fetch('../data/all_classes.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `Network response was not ok, status: ${response.status}`
      );
    }
    return response.json();
  })
  .then((jsonData) => {
    // Access the data from the JSON
    //console.log(jsonData);
    let instances = [];
    getDocs(coursesRef).then((snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data() });
      });
      temp.forEach((test) => {
        instances.push(test.courseName);
      })
      //console.log(instances);
    }).then(() => {
      jsonData.forEach(course => {
        const courseName = course.course_name;
        const courseURL = course.course_url;
        const courses = course.classes;
        
        if(!instances.includes(courseName)){
          addDoc(coursesRef, {
            courseName: courseName,
            courseURL: courseURL,
            courseList: courses,
          });
        } 
      
        const option = document.createElement("option"); 
        option.textContent = courseName;
        drop.appendChild(option);
      })
    });
  }).then(() => {
    getDocs(coursesRef).then((snapshot) => {
      let temp = [];
      snapshot.docs.forEach((doc) => {
        temp.push({ ...doc.data() });
      });
      //console.log(temp);
      temp.forEach((test) => {
        classCodes[test.courseName] = test.courseList;
      });
      //console.log(classCodes);
    });
    //console.log("done");
  })


  

  drop.addEventListener('change', () => {
    const optionSelect = drop.value;
    console.log(classCodes[optionSelect]);
  });


