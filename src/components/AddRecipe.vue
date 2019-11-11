<template>
  <v-container>
    <v-row>
      <v-col>
        <h1>Add a recipe</h1>
      </v-col>
    </v-row>
    <v-form>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            label="Title"
            outlined
            filled
            v-model="title"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=12 md="4" lg="3">
          <v-text-field
            label="Preparation time"
            outlined
            filled
            v-model="prepTime"
            type="number"
            hint="Enter the preparation time in minutes"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols=12 md="4" lg="3">
          <v-textarea
            label="Description"
            outlined
            filled
            v-model="description"
          ></v-textarea>
        </v-col>
      </v-row>

    </v-form>
  </v-container>
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
