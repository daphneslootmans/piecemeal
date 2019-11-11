import firebase from 'firebase'
import router from '@/router/'

const actions = {
  signIn ({ state, commit }, payload) {
    firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(
      router.push('/dashboard')
    )
  },
  signOut ({ state, commit }) {
    firebase.auth().signOut()
  },
  registerEmail ({ state, commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(
      router.push('/dashboard')
    )
  }
}

export default actions
