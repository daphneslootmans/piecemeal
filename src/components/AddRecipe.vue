<template>
  <div>
    <div class="content">
      <h1>Add a recipe</h1>
    </div>
    <recipe-form
      :loading="loading"
    ></recipe-form>
  </div>
</template>

<script>
  import { auth } from '@/firebaseConfig.js'
  import { mapMutations, mapState, mapActions } from 'vuex'
  import { eventBus } from '@/services/event-bus'
  import RecipeForm from './RecipeForm'
  import RecipeActions from './RecipeActions'

  export default {
    name: 'AddRecipe',
    components: {
      RecipeForm,
      RecipeActions
    },
    data () {
      return {
        loading: false
      }
    },
    computed: {
      ...mapState({
        currentUser: 'currentUser',
        isMobile: 'isMobile'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      ...mapMutations ({
        clearRecipe: 'clearCurrentRecipe'
      }),
      ...mapActions({
        addRecipe: 'addRecipe'
      }),
      handleAddRecipe (form) {
        this.loading = true
        this.addRecipe(form).then(() => this.loading = false )
      }
    },
    watch: {

    },
    mounted () {
      this.clearRecipe()
      eventBus.$on('add-recipe', this.handleAddRecipe)
    },
    beforeDestroy () {
      eventBus.$off('add-recipe', this.handleAddRecipe)
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
