<template>
  <div class=" friend-list">
    <div class="columns">
      <div class="column content">
        <h1>Friends</h1>
        <p>Friends can view and copy your recipes, and you can view and copy theirs. Enter an email address below to send a friend request. Once your friend request is accepted, you can see your friend's recipes in the sidebar.</p>
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
              >Send Request
              </b-button>
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
    <template v-if="friends.length">
      <friend-row v-for="friend in friends" :data="friend"></friend-row>
    </template>
  </div>
</template>

<script>
import FriendRow from './FriendRow'
import { mapState } from 'vuex'
import { auth, notificationCollection, userCollection, timestamp } from '@/firebaseConfig'

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
      user: 'currentUser',
      friends: 'friends'
    }),
    authUser () {
      return auth.currentUser
    }
  },
  methods: {
    sendFriendRequest () {
      console.log('adding friend')
      this.addFriendLoading = true

      userCollection.where('email', '==', this.email)
        .get()
        .then((doc) => {
          console.log('friend doc: ', doc)
          if (doc.empty) {
            // no user with this email address
            this.error = 'User not found'
            this.showError = true
          } else {
            // user found
            this.error = ''
            this.showError = false
            doc.forEach(document => {
              console.log(document.id, ' => ', document.data())
              if (!this.friends.find(friend => friend.id === document.id)) {
                userCollection.doc(document.id).collection('friends').doc(this.authUser.uid).set({
                  id: this.authUser.uid,
                  username: this.user.username,
                  email: this.user.email,
                  status: 'pending',
                  validationRequired: true
                })
                let friend = document.data()
                userCollection.doc(this.authUser.uid).collection('friends').doc(document.id).set({
                  id: document.id,
                  username: friend.username,
                  email: friend.email,
                  status: 'pending'
                })
                notificationCollection.add({
                  message: `You have a new friend request from ${this.user.username}`,
                  unread: true,
                  user: document.id,
                  timestamp: timestamp
                })
              }
            })

          }
        })
        .catch(function (error) {
          console.log('Error getting documents: ', error)
        })
        .finally(() => {
          this.addFriendLoading = false
          this.email = ''
        })
    }
  },
  watch: {},
  created () {
  }
}
</script>

<style scoped lang="scss">

</style>
