<template>
  <v-container>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12" md="6">
        <v-form @submit.prevent>
          <h2>Register</h2>
          <div v-if="user">{{ user.email }}</div>
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
              hint="At least 8 characters"
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
          <div>
            <v-btn
              color="primary"
              @click="registerEmail({email: email, password: password})"
            >Register</v-btn>
          </div>
        </v-form>

      </v-col>
    </v-row>
  </v-container>
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
