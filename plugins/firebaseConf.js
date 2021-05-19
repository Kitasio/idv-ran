import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAQbrWlyVFuRfmEE94qqlDAqalX_ur208M",
  authDomain: "idv-ran.firebaseapp.com",
  projectId: "idv-ran",
  storageBucket: "idv-ran.appspot.com",
  messagingSenderId: "109171264282",
  appId: "1:109171264282:web:02bd5d65c79c8782103aa3",
  measurementId: "G-M9EHZ7HH8X"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init firestore service
const projectStorage = firebase.storage()
const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectStorage, projectFirestore, projectAuth, timestamp }