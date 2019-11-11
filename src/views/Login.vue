<template>
  <v-app>
    <v-content>
      <v-container>
        <v-row
          align="center"
          justify="center"
        >
          <v-col cols="12" md="6">
            <v-form @submit.prevent>
              <v-col cols="12">
                <h2>Login</h2>
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
                  @click="signIn({email: email, password: password})"
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
        user: 'authUser'
      })
    },
    methods: {
      ...mapActions({
        signIn: 'signIn'
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
