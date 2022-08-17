import app from './firebase_init'
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { UserCredential } from '@firebase/auth'
import firebase from 'firebase/compat'
import Unsubscribe = firebase.Unsubscribe

abstract class FirebaseAPI {
  abstract login(username: string, password: string): Promise<UserCredential>
  abstract logout(): Promise<void>
  abstract loginByGoogleOAuth(): Promise<UserCredential>
  abstract getAllProjects(): Promise<{ [key: string | number]: Project }>
  abstract getProjectById(project_id: string): Promise<Project>
  abstract getProjectRealtime(project_id: string): Unsubscribe
}

const db = getFirestore(app)
const auth = getAuth(app)
export default {
  /* User Authentication */
  login(username, password) {
    return signInWithEmailAndPassword(auth, username, password)
  },
  logout() {
    return signOut(auth)
  },
  loginByGoogleOAuth() {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  },

  /* Projects */
  getAllProjects() {
    return new Promise((resolve, reject) => {
      getDocs(collection(db, 'projects'))
        .then((resp) => {
          const result: { [key: string | number]: Project } = {}
          resp.forEach((doc) => {
            const data = doc.data()
            result[doc.id] = {
              'id': doc.id,
              'name': data.name,
              'description': data.description,
              'visibility': data.visibility,
              'boards': data.boards,
              'user': data.users,
            }
          })
          resolve(result)
        })
        .catch(() => {
          reject({ 'error': 'Firebase API error' })
        })
    })
  },

  /* Realtime listener */
  getProjectRealtime(project_id: string) {
    const doc_ref = doc(db, 'projects', project_id)
    return onSnapshot(doc_ref, (doc) => {
      console.log(' data: ', doc.data())
    })
  },
} as FirebaseAPI
