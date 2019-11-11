<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" md="6">
            <v-form @submit.prevent="signInEmail">
              <v-col cols="12">
                <h2>Login</h2>
                <v-alert
                  v-show="error"
                  text
                  type="error"
                >
                  <font-awesome-icon slot="prepend" icon="exclamation"></font-awesome-icon>
                  {{ error }}
                </v-alert>
<!--                TODO: add more detailed authentication-->
                <div v-if="user">{{ user.email }}</div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="email"
                  label="Email"
                  outlined
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="password"
                  :type="showPw ? 'text' : 'password'"
                  name="input-10-1"
                  label="Password"
                  outlined
                >
                  <template v-slot:append>
                    <v-fade-transition leave-absolute>
                      <font-awesome-icon icon="eye" v-if="showPw" @click="showPw = !showPw"></font-awesome-icon>
                      <font-awesome-icon icon="eye-slash" v-else @click="showPw = !showPw"></font-awesome-icon>
                    </v-fade-transition>
                  </template>
                </v-text-field>
              </v-col>
              <v-col>
                <v-btn
                  color="primary"
                  @click="signInEmail"
                >
                  Sign in
                </v-btn>
              </v-col>
            </v-form>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'
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
      })
    },
    methods: {
      ...mapActions({
        signIn: 'signIn'
      }),
      signInEmail () {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
                  this.$router.push('/dashboard')
                }
            )
            .catch(error => { this.$store.commit('setError', error)})
      }
    }
  }
</script>

<style scoped lang="scss">
  .container {
    min-height: 100vh;
  }
</style>
