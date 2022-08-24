import app from './firebase_init'
import { collection, doc, getDocs, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { UserCredential } from '@firebase/auth'
import { DocumentData, DocumentReference, Unsubscribe } from '@firebase/firestore'
import { Ref } from 'vue'

interface FirebaseAPI {
  login(username: string, password: string): Promise<UserCredential>
  logout(): Promise<void>
  loginByGoogleOAuth(): Promise<UserCredential>
  getAllProjects(): Promise<{ [key: string | number]: Project }>
  getProjectRealtimeRef(project_id: string, data_ref: Ref): Unsubscribe
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
  getProjectRealtimeRef(project_id: string, data_ref) {
    const doc_ref = doc(db, 'projects', project_id)
    return onSnapshot(doc_ref, (doc) => {
      const data = doc.data()
      data_ref.value = {
        'id': doc.id,
        'name': data?.name,
        'description': data?.description,
        'visibility': data?.visibility,
        'boards': data?.boards || [],
        'user': data?.users || [],
      }
    })
  },
} as FirebaseAPI
