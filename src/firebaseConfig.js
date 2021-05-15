import firebase from 'firebase'
import 'firebase/firestore'
import config from '../firebase.js'

firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser
const recipeCollection = db.collection('recipes')
const userCollection = db.collection('users')
const notificationCollection = db.collection('notifications')
const categoriesCollection = db.collection('categories')
const timestamp = firebase.firestore.FieldValue.serverTimestamp()

export {
  db,
  auth,
  currentUser,
  recipeCollection,
  userCollection,
  notificationCollection,
  categoriesCollection,
  timestamp
}
