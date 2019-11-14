<template>
  <section class="section">
    <div class="content">
        <h1>Add a recipe</h1>
    </div>
    <form>
      <div class="columns">
        <div class="column is-6">
          <b-field label="Title">
            <b-input
              type="text"
              v-model="title"
            ></b-input>
          </b-field>
          <b-field label="Preparation time">
            <b-numberinput
              v-model="prepTime"
            ></b-numberinput>
          </b-field>
          <b-field label="Description">
            <b-input
              type="textarea"
              v-model="description"
            ></b-input>
          </b-field>
        </div>
      </div>
    </form>
  </section>
</template>

<script>
  const fb = require('@/firebaseConfig.js')
  export default {
    name: 'AddRecipe',
    data () {
      return {
        title: '',
        prepTime: null,
        tags: [],
        description: ''
      }
    },
    computed: {

    },
    methods: {

    },
    mounted () {
      fb.db.ref('recipes').on('value', snapshot => {
        this.$store.commit('addRecipe', snapshot.val())
      })
    }
  }
</script>

<style scoped>

</style>
