<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import firebase from 'firebase/app'
  import 'firebase/auth'

  export default {
    created () {
      firebase.auth().onAuthStateChanged(user => {this.$store.commit('setAuthUser', user)})
    }
  }
</script>

<style lang="scss">
  @import "sass/main.scss";
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
</style>
