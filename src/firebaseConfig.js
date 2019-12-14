import firebase from 'firebase'
import 'firebase/firestore'
import config from '../firebase.js'

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// date issue fix according to firebase
const settings = {
  timestampsInSnapshots: true
}
db.settings(settings)

export {
  db,
  auth,
  currentUser,
}
