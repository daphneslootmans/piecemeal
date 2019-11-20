<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-6">
          <form @submit.prevent="register">
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
            <b-field label="Repeat password">
              <b-input type="password" v-model="password2" password-reveal></b-input>
            </b-field>

            <div class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <b-button tag="input"
                            native-type="submit"
                            value="Register"
                            expanded
                            type="is-primary"
                            @click.prevent="register"
                  />
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
        password2: ''
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
      }),
      register () {
        this.registerEmail({
          email: this.email,
          password: this.password
        })
      }
    },
    created () {
    }
  }
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
  }
</style>
