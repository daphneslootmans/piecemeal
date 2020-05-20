<template>
  <div class="content friend-list">
    <h1>Friends</h1>
    <friend-row v-for="friend in friends"></friend-row>
  </div>
</template>

<script>
  import FriendRow from './FriendRow'

  export default {
    name: 'FriendList',
    components: { FriendRow },
    props: {},
    data () {
      return {
        friends: [
          'friend1', 'friend2'
        ]
      }
    },
    computed: {},
    methods: {},
    watch: {}
  }
</script>

<style scoped lang="scss">

</style>
