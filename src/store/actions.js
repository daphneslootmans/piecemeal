import { db, auth } from '../firebaseConfig'
import router from '@/router/'

const actions = {
  signOut ({ state, commit }) {
    auth.signOut()
      .then( () => {
        router.push('/login')
      })
      .catch(error => { state.error = error })
  },
  registerEmail ({ state, commit, dispatch }, payload) {
    auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then( response => {
        console.log('new user uid:', response.user.uid)
        router.push('/dashboard')
        dispatch('setUser', response.user.uid)
      })
      .catch(error => { state.error = error })
  },
  getUser ({ state, commit }) {
    let users = db.collection('users')
    let getCurrent = users.doc(auth.currentUser.uid).get()
      .then(doc => {
        if (!doc.exists) {
          console.log('No user data!');
        } else {
          console.log('User data:', doc.data());
          commit('setCurrentUser', doc.data())
        }
      })
  },
  setUser ({ state }, uid) {
    let users = db.collection('users')
    let cats = users.doc('categories').get().then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
        let setDoc = users.doc(uid).set({categories: doc.data().standard})
      }
    })
  }
}

export default actions
