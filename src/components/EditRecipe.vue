<template>
  <div>
    <div class="content">
      <h1>Edit recipe</h1>
    </div>
    <recipe-form
      :loading="loading"
    ></recipe-form>
  </div>
</template>

<script>
  import { auth, recipeCollection } from '@/firebaseConfig.js'
  import { mapState, mapMutations } from 'vuex'
  import { eventBus } from '@/services/event-bus'
  import RecipeForm from './RecipeForm'

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
        currentUser: 'currentUser',
        recipe: 'currentRecipe',
        isMobile: 'isMobile'
      }),
      user () {
        return auth.currentUser
      },
    },
    methods: {
      ...mapMutations({
        setEditing: 'setEditing'
      }),
      updateRecipe (form) {
        this.loading = true

        let recipe = recipeCollection.doc(this.recipe.id)
        recipe.update(form)
          .then(() => {
            this.loading = false
            this.setEditing({ editing: false })
            this.$buefy.toast.open({
              message: `Recipe saved successfully!`,
              type: 'is-success',
              position: this.isMobile ? 'is-bottom' : 'is-top-right',
              duration: 3000
            })
            this.$router.push({ name: 'recipe', params: { id: recipe.id } })
          })
      }
    },
    created () {
      this.setEditing({ editing: true })
    },
    mounted () {
      eventBus.$on('update-recipe', this.updateRecipe)
    },
    beforeDestroy () {
      eventBus.$off('update-recipe', this.updateRecipe)
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
