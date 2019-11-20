import firebase from 'firebase'
import router from '@/router/'

const actions = {
  signOut ({ state, commit }) {
    firebase.auth().signOut()
      .then( () => {
        router.push('/login')
      })
      .catch(error => { state.error = error })
  },
  registerEmail ({ state, commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        router.push('/dashboard')
      )
      .catch(error => { state.error = error })
  }
}

export default actions
