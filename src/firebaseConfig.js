import firebase from 'firebase'
import 'firebase/firestore'
import config from '../firebase.js'

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

export {
  db,
  auth,
  currentUser,
}
