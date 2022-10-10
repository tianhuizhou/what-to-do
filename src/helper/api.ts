import axiosHelper from '@/helper/axios_helper'
import app from './firebase_init'
import { doc, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import { UserCredential } from '@firebase/auth'
import { Unsubscribe } from '@firebase/firestore'
import { Ref } from 'vue'

interface FirebaseAPI {
  /* Authentication */
  login(username: string, password: string): Promise<UserCredential>
  logout(): Promise<void>
  loginByGoogleOAuth(): Promise<UserCredential>
  /* Projects */
  getAllProjects(): Promise<{ [key: string | number]: Project }>
  createProject(project: Project): Promise<{ 'data': Project[] }>
  updateProject(project_id: number, project: Partial<Project>): Promise<{ 'data': Project }>
  deleteProject(project_id: number): Promise<{ 'msg': string }>
  getProjectRealtimeRef(project_id: string, data_ref: Ref): Unsubscribe
  /* Boards */
  createBoard(board: Board): Promise<{ 'data': Board[] }>
  updateBoard(board_id: number, board: Partial<Board>): Promise<{ 'data': Board }>
  deleteBoard(board_id: number): Promise<{ 'msg': string }>
  moveBoard(project_id: number, board_order: number[]): Promise<{ 'data': Project }>
  /* Tasks */
  createTask(task: Task): Promise<{ 'data': Task[] }>
  updateTask(task_id: number, task: Partial<Task>): Promise<{ 'data': Task }>
  moveTaskAcrossBoard(
    task_id: number,
    dto: { 'old_board_id': number; 'new_board_id': number; 'new_board_position': number },
  ): Promise<{ 'msg': string }>
  deleteTask(task_id: number): Promise<{ 'msg': string }>
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
  createProject(project) {
    const url = `${APIURL}/projects`
    const payload = {
      'name': project.name,
      'description': project.description || '',
      'visibility': project.visibility || 'public',
      'favorite': project.favorite || false,
    }
    return axiosHelper(url, null, payload, 'POST', getHeaders())
  },
  updateProject(project_id, project) {
    const url = `${APIURL}/projects/${project_id}`
    const payload = {
      'name': project.name,
      'description': project.description,
      'visibility': project.visibility,
      'favorite': project.favorite,
      'board_order': project.board_order,
    }
    return axiosHelper(url, null, payload, 'PUT', getHeaders())
  },
  deleteProject(project_id) {
    const url = `${APIURL}/projects/${project_id}`
    return axiosHelper(url, null, null, 'DELETE', getHeaders())
  },

  /* Boards */
  createBoard(board) {
    const url = `${APIURL}/boards`
    const payload = {
      'name': board.name,
      'theme': board.theme,
      'project_id': board.project_id,
    }
    return axiosHelper(url, null, payload, 'POST', getHeaders())
  },
  updateBoard(board_id, board) {
    const url = `${APIURL}/boards/${board_id}`
    const payload = {
      'name': board.name,
      'theme': board.theme,
      'task_order': board.task_order,
    }
    return axiosHelper(url, null, payload, 'PUT', getHeaders())
  },
  deleteBoard(board_id) {
    const url = `${APIURL}/boards/${board_id}`
    return axiosHelper(url, null, null, 'DELETE', getHeaders())
  },
  moveBoard(project_id, board_order) {
    const url = `${APIURL}/projects/${project_id}`
    const payload = {
      'board_order': board_order,
    }
    return axiosHelper(url, null, payload, 'PUT', getHeaders())
  },

  /* Tasks */
  createTask(task) {
    const url = `${APIURL}/tasks`
    const payload = {
      'name': task.name,
      'priority': task.priority,
      'description': task.description,
      'board_id': task.board_id,
    }
    return axiosHelper(url, null, payload, 'POST', getHeaders())
  },
  updateTask(task_id, task) {
    const url = `${APIURL}/tasks/${task_id}`
    const payload = {
      'name': task.name,
      'priority': task.priority,
      'description': task.description,
    }
    return axiosHelper(url, null, payload, 'PUT', getHeaders())
  },
  // If just try to move tasks to different position within the same board, using Endpoint updateBoard that passing the updated 'task_order'
  moveTaskAcrossBoard(task_id, dto) {
    const url = `${APIURL}/tasks/move/${task_id}`
    const payload = {
      'old_board_id': dto.old_board_id,
      'new_board_id': dto.new_board_id,
      'new_board_position': dto.new_board_position,
    }
    return axiosHelper(url, null, payload, 'PUT', getHeaders())
  },
  deleteTask(task_id) {
    const url = `${APIURL}/tasks/${task_id}`
    return axiosHelper(url, null, null, 'DELETE', getHeaders())
  },

  /* Realtime listener */
  getProjectRealtimeRef(project_id: string, data_ref) {
    const doc_ref = doc(db, 'projects', project_id)
    return onSnapshot(doc_ref, (doc) => {
      const data = doc.data()
      data_ref.value = {
        'id': data?.id,
        'name': data?.name,
        'description': data?.description,
        'visibility': data?.visibility,
        'boards': data?.boards || [],
        'board_order': data?.board_order || [],
        'favorite': data?.favorite || false,
        'session_uid': data?.session_uid || '',
      }
    })
  },
} as FirebaseAPI
