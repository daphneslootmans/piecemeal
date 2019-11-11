import firebase from 'firebase'

const actions = {
  signIn ({ state, commit }) {

  },
  signOut ({ state, commit }) {

  },
  registerEmail ({ state, commit }, payload) {
    firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
  }
}

export default actions
