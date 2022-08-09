console.log('asdfasdfadsf')
/* Firebase config */
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_API_KEY,
  authDomain: process.env.VUE_APP_FB_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FB_DATABASE_URL,
  projectId: process.env.VUE_APP_FB_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FB_MSG_SENDER_ID,
  appId: process.env.VUE_APP_FB_APP_ID,
  measurementId: process.env.VUE_APP_FB_MEASUREMENT_ID,
}

// Initialize Firebase
const fb = initializeApp(firebaseConfig)

import { collection, query, where } from 'firebase/firestore'
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { UserCredential } from '@firebase/auth'

/* Firebase Authentication */
const auth = getAuth(fb)

abstract class API {
  abstract login(username: string, password: string): Promise<UserCredential>
  abstract logout(): Promise<void>
}

export default {
  login(username, password) {
    return signInWithEmailAndPassword(auth, username, password)
  },
  logout() {
    return signOut(auth)
  },
} as API
