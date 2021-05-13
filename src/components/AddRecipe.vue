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
  import { db, auth } from '../firebaseConfig.js'
  import { mapMutations, mapState } from 'vuex'
  import { eventBus } from '../services/event-bus'
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
        title: '',
        category: '',
        description: '',
        rating: 0,
        imageUrl: '',
        tags: [],
        prepTime: null,
        ingredientsRaw: '',
        ingredients: [],
        materials: [],
        comment: '',
        directions: [''],
        dropFiles: [],
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
      addRecipe (form) {
        this.loading = true

        form.createdAt = new Date()
        form.users = [this.user.uid]
        form.isDeleted = false

        db.collection('recipes').add(form)
          .then(docRef => {
            this.loading = false
            this.$buefy.toast.open({
              message: `Recipe saved successfully!`,
              type: 'is-success',
              position: this.isMobile ? 'is-bottom' : 'is-top-right',
              duration: 3000
            })
          })
      }
    },
    watch: {

    },
    mounted () {
      this.clearRecipe()
      eventBus.$on('add-recipe', this.addRecipe)
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
