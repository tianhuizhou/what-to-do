import axiosHelper from '@/helper/axios_helper'
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
  createProject(project: Project): Promise<{ 'data': Project[] }>
  deleteProject(project_id: number): Promise<{ 'msg': string }>
  getProjectRealtimeRef(project_id: string, data_ref: Ref): Unsubscribe
}

const db = getFirestore(app)
const auth = getAuth(app)

const APIURL = process.env.VUE_APP_API

function getHeaders(use_token = true) {
  const headers = []
  headers.push({ 'Content-Type': 'application/json' })

  const user = JSON.parse(localStorage.getItem('WhatToDoUser') || '')
  const log_token = user.stsTokenManager.accessToken

  if (log_token && use_token) headers.push({ 'Authorization': `Bearer ${log_token}` })
  return Object.assign({}, ...headers)
}

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
    const url = `${APIURL}/projects`
    return axiosHelper(url, null, null, 'GET', getHeaders())
  },
  createProject(project: Project) {
    const url = `${APIURL}/projects`
    const payload = {
      'name': project.name,
      'description': project.description || '',
      'visibility': project.visibility || 'public',
      'favorite': project.favorite || false,
    }
    return axiosHelper(url, null, payload, 'POST', getHeaders())
  },
  deleteProject(project_id: number) {
    const url = `${APIURL}/projects`
    const params = { 'id': project_id }
    return axiosHelper(url, params, null, 'DELETE', getHeaders())
  },
  // getAllProjects() {
  //   return new Promise((resolve, reject) => {
  //     getDocs(collection(db, 'projects'))
  //       .then((resp) => {
  //         const result: { [key: string | number]: Project } = {}
  //         resp.forEach((doc) => {
  //           const data = doc.data()
  //           result[doc.id] = {
  //             'id': doc.id,
  //             'name': data.name,
  //             'description': data.description,
  //             'visibility': data.visibility,
  //             'favorite': data.favorite,
  //             'boards': data.boards,
  //             'user': data.users,
  //           }
  //         })
  //         resolve(result)
  //       })
  //       .catch(() => {
  //         reject({ 'error': 'Firebase API error' })
  //       })
  //   })
  // },

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
