<template>
  <div id="app">
    <navbar-top></navbar-top>
    <router-view name="sidebar"></router-view>
    <router-view/>
  </div>
</template>

<script>
  import 'firebase/auth'
  import NavbarTop from './components/NavbarTop'

  export default {
    components: {
      NavbarTop
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
