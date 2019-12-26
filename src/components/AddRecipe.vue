<template>
  <section class="section">
    <div class="content">
      <h1>Add a recipe</h1>
    </div>
    <recipe-form
      :loading="loading"
      @save-form="addRecipe"
    ></recipe-form>
  </section>
</template>

<script>
  import { db, auth } from '../firebaseConfig.js'
  import { mapState } from 'vuex'
  import RecipeForm from './RecipeForm'

  export default {
    name: 'AddRecipe',
    components: {
      RecipeForm
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
        currentUser: 'currentUser'
      }),
      user () {
        return auth.currentUser
      }
    },
    methods: {
      addRecipe (form) {
        this.loading = true

        form.createdAt = new Date()
        form.users = [this.user.uid]
        form.isDeleted = false

        let setDoc = db.collection('recipes').add(form)
          .then(docRef => {
            this.loading = false
            this.$buefy.toast.open({
              message: `Recipe saved successfully!`,
              type: 'is-dark',
              position: 'is-top-right',
              duration: 3000
            })
          })
      }
    },
    watch: {

    },
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
