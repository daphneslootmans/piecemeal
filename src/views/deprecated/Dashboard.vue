<!--<template>-->
<!--  <div>-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import { mapState, mapActions } from 'vuex'-->
<!--  import { db, auth } from '../../firebaseConfig'-->
<!--  import AddRecipe from '@/components/AddRecipe'-->
<!--  import EditRecipe from '@/components/EditRecipe'-->
<!--  import ViewRecipe from '@/components/ViewRecipe'-->

<!--  export default {-->
<!--    components: {-->
<!--      AddRecipe,-->
<!--      EditRecipe,-->
<!--      ViewRecipe-->
<!--    },-->
<!--    props: {-->
<!--      source: String-->
<!--    },-->
<!--    data: () => ({-->
<!--      activeCat: ''-->
<!--    }),-->
<!--    computed: {-->
<!--      ...mapState({-->
<!--        currentUser: 'currentUser',-->
<!--        recipes: 'recipes'-->
<!--      }),-->
<!--      user () {-->
<!--        return auth.currentUser-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      ...mapActions({-->
<!--        signOut: 'signOut',-->
<!--        getUser: 'getUser',-->
<!--        setUser: 'setUser',-->
<!--        getRecipes: 'getRecipes'-->
<!--      }),-->
<!--      addRecipe () {-->
<!--        this.$router.push('/recipes')-->
<!--      },-->
<!--      setActiveCat (cat, index) {-->
<!--        this.activeCat = cat.name-->
<!--        let catExp = this.currentUser.categories[index].expanded-->
<!--        // this.$set(catExp, 'expanded', !catExp)-->
<!--      },-->
<!--      getRecipeDetail (id) {-->
<!--        this.$buefy.toast.open({-->
<!--          message: `clicked recipe ${id}`,-->
<!--          type: 'is-dark',-->
<!--          position: 'is-top-right',-->
<!--          duration: 3000-->
<!--        })-->
<!--        console.log('id: ', id)-->
<!--        this.$router.push({ name: 'recipe', params: { id } })-->
<!--        this.currentComponent = 'ViewRecipe'-->
<!--      },-->
<!--      categoryRecipes (cat) {-->
<!--        return this.recipes.some(recipe => recipe.category === cat)-->
<!--      },-->
<!--      setCategories () {-->
<!--        // tmp function to edit standard categories-->
<!--        let data = {-->
<!--          standard:-->
<!--            [-->
<!--              {-->
<!--                name: 'Dinner',-->
<!--                expanded: true-->
<!--              },-->
<!--              {-->
<!--                name: 'Lunch',-->
<!--                expanded: true-->
<!--              },-->
<!--              {-->
<!--                name: 'Breakfast',-->
<!--                expanded: true-->
<!--              },-->
<!--              {-->
<!--                name: 'Side Dish',-->
<!--                expanded: true-->
<!--              },-->
<!--              {-->
<!--                name: 'Dessert',-->
<!--                expanded: true-->
<!--              },-->
<!--            ]-->
<!--        }-->
<!--        let cats = db.collection('users').doc('categories').set(data)-->
<!--      }-->
<!--    },-->
<!--    watch: {-->
<!--      user () {-->
<!--        this.getRecipes()-->
<!--      }-->
<!--    },-->
<!--    created () {-->
<!--      this.getUser()-->
<!--      this.getRecipes()-->
<!--    },-->
<!--    mounted () {-->
<!--      if (this.$route.params.id) {-->
<!--        this.getRecipeDetail(this.$route.params.id)-->
<!--      } else if (this.recipes.length) {-->
<!--        console.log('recipes detected')-->
<!--        this.getRecipeDetail(this.recipes[0].id)-->
<!--      }-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style lang="scss">-->







<!--</style>-->
