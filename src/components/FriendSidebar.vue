<template>
  <div class="column is-3 sidebar">
    <b-button icon-left="plus"
              type="is-primary"
              outlined
              expanded
              tag="router-link"
              to="/recipes"
              :disabled="$route.name === 'recipes'"
    >Add a Recipe
    </b-button>
    <b-button icon-left="book"
              type="is-primary"
              outlined
              expanded
              tag="router-link"
              to="/recipes"
    >My Recipes
    </b-button>
    <template v-for="friend in friends">
      <b-menu>
        <b-menu-list
          :label="friend.username"
        >
          <b-menu-item
            v-for="(category, index) in friend.categories"
            v-if="categoryRecipes(category, friend.id) > 0"
            :key="category.name + index"
            icon="utensils"
            :active="activeCat === category.name"
            :expanded="category.expanded">
            <template slot="label" slot-scope="props">
                {{ category.name }}
              <b-icon
                class="is-pulled-right"
                :icon="props.expanded ? 'angle-down' : 'angle-up'">
              </b-icon>
            </template>
            <b-menu-item
              v-for="recipe in getFriendRecipes(friend.id)"
              :key="recipe.id"
              v-if="recipe.category === category.name && !recipe.isDeleted"
              :label="recipe.title"
              @click="getRecipeDetail(friend.id, recipe.id)"
            ></b-menu-item>
          </b-menu-item>
        </b-menu-list>
      </b-menu>
    </template>

  </div>
</template>

<script>
  import { mapActions, mapState, mapGetters } from 'vuex'
  import { auth } from '@/firebaseConfig'

  export default {
    name: 'FriendSidebar',
    props: {
      source: String
    },
    data: () => ({
      activeCat: ''
    }),
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        friendRecipes: 'friendRecipes',
        friends: 'friends'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapActions({
        signOut: 'signOut',
        getUser: 'getUser',
        setUser: 'setUser',
      }),
      setActiveCat (cat) {
        this.activeCat = cat.name
      },
      getRecipeDetail (friendId, recipeId) {
        this.$router.push({ name: 'friend-recipe', params: { friendId: friendId, recipeId: recipeId } })
      },
      categoryRecipes (cat, id) {
        return this.friendRecipes.filter(recipe => recipe.users.includes(id) && recipe.category === cat.name).length
      },
      getFriendRecipes (id) {
       return this.friendRecipes.filter(recipe => recipe.users.includes(id))
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  .menu {
    margin-top: 1rem;
  }

  .menu-list {
    a {
      line-height: 1;

      .icon.is-small {
        position: relative;
        top: 5px;
        margin-right: 5px;
      }
    }
  }
</style>
