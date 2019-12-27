<template>
  <div class="column is-3 sidebar">
    <b-button icon-left="plus" type="is-primary" outlined expanded @click="addRecipe">
      Add a recipe
    </b-button>
    <b-menu>
      <b-menu-list
        label="Recipes"
      >
        <b-menu-item
          v-for="(category, index) in currentUser.categories"
          :key="category.name + index"
          v-if="categoryRecipes(category.name)"
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
            v-for="recipe in recipes"
            :key="recipe.id"
            v-if="recipe.category === category.name && !recipe.isDeleted"
            :label="recipe.title"
            @click="getRecipeDetail(recipe.id)"
          ></b-menu-item>
        </b-menu-item>
      </b-menu-list>
    </b-menu>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import { auth, db } from '../firebaseConfig'

  export default {
    name: 'Sidebar',
    props: {
      source: String
    },
    data: () => ({
      activeCat: ''
    }),
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        recipes: 'recipes'
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
        getRecipes: 'getRecipes'
      }),
      addRecipe () {
        this.$router.push({ name: 'recipes' })
      },
      setActiveCat (cat, index) {
        this.activeCat = cat.name
        let catExp = this.currentUser.categories[index].expanded
        // this.$set(catExp, 'expanded', !catExp)
      },
      getRecipeDetail (id) {
        this.$buefy.toast.open({
          message: `clicked recipe ${id}`,
          type: 'is-dark',
          position: 'is-top-right',
          duration: 3000
        })
        console.log('id: ', id)
        this.$router.push({ name: 'recipe', params: { id } })
      },
      categoryRecipes (cat) {
        return this.recipes.some(recipe => recipe.category === cat)
      }
    },
    watch: {}
  }
</script>

<style lang="scss">
  .sidebar {
    height: calc(100vh - 132px - 1.5rem);
    max-height: calc(100vh - 132px - 1.5rem);
    border-right: 1px solid $grey-lightest;
    button {
      margin-bottom: 1rem;
    }
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
