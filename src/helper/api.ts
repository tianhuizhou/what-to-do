import app from './firebase_init'
import { Board, Project } from './types'
import { collection, query, where, getFirestore, getDocs } from 'firebase/firestore'
import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { UserCredential } from '@firebase/auth'
import { QuerySnapshot } from '@firebase/firestore'

abstract class FirebaseAPI {
  abstract login(username: string, password: string): Promise<UserCredential>
  abstract logout(): Promise<void>
  abstract loginByGoogleOAuth(): Promise<UserCredential>
  abstract getAllProjects(): Promise<Project[]>
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

  /* Get data once */
  getAllProjects() {
    return new Promise<Project[]>((resolve, reject) => {
      getDocs(collection(db, 'projects'))
        .then((resp) => {
          const result: Project[] = []
          resp.forEach((doc) => {
            const data = doc.data()
            result.push({
              'uuid': data.uuid,
              'name': data.name,
              'favorite': data.favorite,
              'created_at': data.created_at,
              'updated_at': data.updated_at,
              'boards': data.boards,
              'users': data.users,
            })
          })
          resolve(result)
        })
        .catch(() => {
          reject({ 'error': 'Firebase API error' })
        })
    })
  },

  /* Real time listener */
  listenProject() {},
} as FirebaseAPI
