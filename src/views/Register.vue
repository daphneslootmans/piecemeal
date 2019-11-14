<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <form @submit.prevent="registerEmail">
            <div class="content">
              <h2>Register</h2>
            </div>
            <b-notification
              :active.sync="showError"
              aria-close-label="Close notification"
              role="alert"
              type="is-danger"
            >
              {{ error }}
            </b-notification>
            <!--                TODO: add more detailed authentication-->
            <div v-if="user">{{ user.email }}</div>
            <b-field label="Email">
              <b-input type="email" v-model="email"></b-input>
            </b-field>
            <b-field label="Password">
              <b-input type="password" v-model="password" password-reveal></b-input>
            </b-field>

            <div class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <b-button
                    type="is-primary"
                    expanded
                    @click="registerEmail"
                  >
                    Register
                  </b-button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import firebase from 'firebase'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Login',
    data () {
      return {
        email: '',
        password: '',
        showPw: false
      }
    },
    computed: {
      ...mapState({
        user: 'authUser',
        error: 'error'
      }),
      showError () {
        return this.error !== null
      }
    },
    methods: {
      ...mapActions({
        registerEmail: 'registerEmail'
      })
    },
    created () {
      firebase.auth().onAuthStateChanged(user => {this.$store.commit('setAuthUser', user)})
    }
  }
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
  }
</style>
