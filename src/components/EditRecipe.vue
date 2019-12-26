<template>
  <div>
    <div class="content">
      <h1>Edit recipe</h1>
    </div>
    <recipe-form
      :loading="loading"
      @save-form="updateRecipe"
    ></recipe-form>
  </div>
</template>

<script>
  import { db, auth, recipeCollection } from '../firebaseConfig.js'
  import { mapState } from 'vuex'
  import RecipeForm from './RecipeForm'
  import { timestamp } from '../firebaseConfig'

  export default {
    name: 'EditRecipe',
    components: {
      RecipeForm
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      updateRecipe (form) {
        this.loading = true

        let recipe = recipeCollection.doc(this.$route.params.id)
        recipe.update(form)
          .then(() => {
            this.loading = false
            this.$buefy.toast.open({
              message: `Recipe saved successfully!`,
              type: 'is-dark',
              position: 'is-top-right',
              duration: 3000
            })
            this.$router.push('/dashboard/' + this.$route.params.id)
          })
      }
    },
    watch: {},
    mounted () {
    }
  }
</script>

<style lang="scss">
  .comment-input {
    textarea:not([rows]) {
      min-height: 133px;
    }
  }
</style>
