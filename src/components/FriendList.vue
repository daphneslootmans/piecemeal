<template>
  <div class=" friend-list">
    <div class="columns">
      <div class="column content">
        <h1>Friends</h1>
        <p>Friends can view and copy your recipes, and you can view and copy theirs. Enter an email address below to
          send a friend request.</p>
      </div>
    </div>
    <div class="columns">
      <div class="column">
        <form @submit.prevent="sendFriendRequest">
          <div class="columns">
            <div class="column is-6-desktop">
              <b-field>
                <b-input type="email" v-model="email" placeholder="Email"></b-input>
              </b-field>
            </div>
            <div class="column is-narrow">
              <b-button :loading="addFriendLoading"
                        @click="sendFriendRequest"
                        type="is-primary"
              >Send Request</b-button>
            </div>
          </div>
          <b-notification
            :active.sync="showError"
            aria-close-label="Close notification"
            role="alert"
            type="is-danger"
          >
            {{ error }}
          </b-notification>
        </form>
      </div>
    </div>
    <template v-if="user.friends">
      <friend-row v-for="friend in user.friends" :data="friend"></friend-row>
    </template>
  </div>
</template>

<script>
  import FriendRow from './FriendRow'
  import { mapState, mapActions } from 'vuex'
  import { auth, userCollection } from '../firebaseConfig'
  import firebase from 'firebase'

  export default {
    name: 'FriendList',
    components: { FriendRow },
    props: {},
    data () {
      return {
        email: '',
        showError: false,
        error: '',
        addFriendLoading: false
      }
    },
    computed: {
      ...mapState({
        user: 'currentUser'
      }),
      authUser () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        addFriend: 'addFriend'
      }),
      sendFriendRequest () {
        console.log('adding friend')
        this.addFriendLoading = true

        userCollection.where('email', '==', this.email)
          .get()
          .then((querySnapshot) => {
            console.log('snapshot:', querySnapshot)
            if (querySnapshot.empty) {
              this.error = 'User not found'
              this.showError = true
            } else {
              this.error = ''
              this.showError = false
              querySnapshot.forEach((doc) => {
                console.log(doc.id, ' => ', doc.data())
                let newFriend = userCollection.doc(doc.id)
                newFriend.update({
                  friends: firebase.firestore.FieldValue.arrayUnion({
                    id: this.authUser.uid,
                    username: this.user.username,
                    email: this.user.email,
                    pending: true
                  })
                })
                let user = userCollection.doc(this.authUser.uid)
                let friend = doc.data()
                user.update({
                  friends: firebase.firestore.FieldValue.arrayUnion({
                    id: doc.id,
                    username: friend.username,
                    email: friend.email,
                    pending: true
                  })
                })
              })
            }
          })
          .catch(function (error) {
            console.log('Error getting documents: ', error)
          })
          .finally(() => {
            this.addFriendLoading = false
          })
      },
    },
    watch: {}
  }
</script>

<style scoped lang="scss">

</style>
