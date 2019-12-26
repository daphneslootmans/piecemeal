<template>
  <div id="app">
    <navbar-top></navbar-top>
    <section class="section main-section">
      <div class="container">
        <div class="columns">
          <router-view name="sidebar"></router-view>
          <div class="column main-content">
            <router-view/>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
  import NavbarTop from './components/NavbarTop'
  import { auth, db } from './firebaseConfig'
  import { mapActions } from 'vuex'

  export default {
    components: {
      NavbarTop
    },
    computed: {
      user () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        getUser: 'getUser',
        setUser: 'setUser',
        getRecipes: 'getRecipes'
      }),
      setCategories () {
        // tmp function to edit standard categories
        let data = {
          standard:
            [
              {
                name: 'Dinner',
                expanded: true
              },
              {
                name: 'Lunch',
                expanded: true
              },
              {
                name: 'Breakfast',
                expanded: true
              },
              {
                name: 'Side Dish',
                expanded: true
              },
              {
                name: 'Dessert',
                expanded: true
              },
            ]
        }
        let cats = db.collection('users').doc('categories').set(data)
      }
    },
    watch: {
      user () {
        this.getRecipes()
      }
    },
    created () {
      this.getUser()
      this.getRecipes()
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
  .navbar-brand {
    a {
      margin-right: 2rem;
      font-size: 1.3rem;
      font-weight: 700;
    }

    svg {
      margin-right: 0.5em;
    }
  }
  .main-content {
    padding-left: 2rem;
  }
  .main-section {

  }
</style>
