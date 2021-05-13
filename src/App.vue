<template>
  <div id="app">
    <navbar-top></navbar-top>
    <recipe-actions :friendId="$route.params.friendId" :id="$route.params.recipeId"></recipe-actions>
    <notification-tray :notifications="notifications" v-show="notificationsOpen"></notification-tray>
    <section class="section main-section">
      <div class="container">
        <div class="columns">
          <router-view name="sidebar" v-if="!isMobile"></router-view>
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
  import RecipeActions from './components/RecipeActions'
  import NotificationTray from '@/components/NotificationTray'
  import { auth, db } from './firebaseConfig'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { eventBus } from '@/services/event-bus'

  export default {
    components: {
      NavbarTop, RecipeActions, NotificationTray
    },
    computed: {
      ...mapState({
        currentRecipe: 'currentRecipe',
        recipes: 'recipes',
        friendRecipes: 'friendRecipes',
        isMobile: 'isMobile',
        notifications: 'notifications',
        notificationsOpen: 'notificationsOpen'
      }),
      user () {
        return auth.currentUser
      },
      recipeRoute () {
        return this.$route.name === 'recipes' || this.$route.params.recipeId
      }
    },
    methods: {
      ...mapMutations({
        setRecipe: 'setCurrentRecipe',
        clearCurrentRecipe: 'clearCurrentRecipe',
        setMobile: 'setMobile',
        setEditing: 'setEditing',
        setNavbarActive: 'setNavbarActive'
      }),
      ...mapActions({
        getUser: 'getUser',
        setUser: 'setUser',
        getRecipes: 'getRecipes',
        getNotifications: 'getNotifications',
        getFriends: 'getFriends'
      }),
      setCategories () {
        // tmp function to edit standard categories
          let standard =
            [
              {
                name: 'Dinner',
                expanded: true,
                order: 3
              },
              {
                name: 'Lunch',
                expanded: true,
                order: 1
              },
              {
                name: 'Breakfast',
                expanded: true,
                order: 0
              },
              {
                name: 'Side Dish',
                expanded: true,
                order: 2
              },
              {
                name: 'Dessert',
                expanded: true,
                order: 4
              },
            ]
        db.collection("users").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            let id = doc.id
            standard.forEach(cat => {
              cat.users = [id]
              // db.collection('categories').add(cat)
            })
          });
        });
      },
      checkWindow () {
        let windowWidth = window.innerWidth
        this.setMobile(windowWidth)
      },
      handleShowToast (data) {
        this.$buefy.toast.open({
          message: data.message,
          type: data.type,
          position: data.position,
          duration: data.duration
        })
      }
    },
    watch: {
      user () {
        this.getRecipes()
      },
      $route () {
        this.setNavbarActive({navbarActive: false})
      }
    },
    created () {
      if (this.user) {
        this.getUser()
        this.getRecipes()
        this.getNotifications()
        this.getFriends()
      }
    },
    mounted () {
      this.$nextTick(() => {
        window.addEventListener('resize', this.checkWindow)
        this.checkWindow()
      })
      eventBus.$on('show-toast', this.handleShowToast)
    }
  }
</script>

<style lang="scss">
  @import "sass/main.scss";

  #app {
    min-height: 100vh;
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
    @media screen and (min-width: 769px) {
      padding-left: 2rem;
    }
  }
</style>
