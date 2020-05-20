<template>
  <div class="friend-row">
    <p>This is a friend row <span>recipe count</span></p>
    <div class="button-group">
      <b-button @click="removePrompt"
                type="is-primary"
                icon-left="trash"
      ></b-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FriendRow',
    props: {},
    data () {
      return {}
    },
    computed: {},
    methods: {
      removePrompt() {
        // remove friend based on ID -- also remove current user from friends friend list
        this.$buefy.dialog.confirm({
          title: `Removing friend`,
          message: `Are you sure you want to <b>remove</b> 'name'? You will no longer be able to view their recipes, and they won't be able to view yours.`,
          confirmText: 'Remove friend',
          type: 'is-danger',
          hasIcon: true,
          onConfirm: () => this.removeFriend(id).then(() => {
            this.$buefy.toast.open({
              message: `Friend removed`,
              type: 'is-success',
              position: this.isMobile? 'is-bottom' : 'is-top-right',
              duration: 3000
            })
          })
        })
      }
    },
    watch: {}
  }
</script>

<style scoped lang="scss">
  .friend-row {
    display: flex;
    justify-content: space-between;

    p {
      span {
        margin-left: 1em;
        color: $grey-medium;
        font-style: italic;
      }
    }
  }
</style>
