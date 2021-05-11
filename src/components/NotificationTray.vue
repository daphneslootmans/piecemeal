<template>
  <transition name="fade">
    <div class="notification-tray">
      <b-notification v-for="notification in notifications"
                      :active.sync="notification.unread"
                      aria-close-label="Close notification"
                      @close="updateNotification(notification)"
      >
        {{ notification.message }}
      </b-notification>
    </div>
  </transition>
</template>

<script>
import { auth, notificationCollection } from '../firebaseConfig.js'
export default {
  name: 'NotificationTray',
  props: {
    notifications: {
      type: Array
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {
    updateNotification (notification) {
      this.loading = true
      notification.unread = false
      let note = notificationCollection.doc(notification.id)
      note.update(notification)
        .then(() => {
          this.loading = false
        })
    }
  },
  watch: {}
}
</script>

<style scoped lang="scss">
.notification-tray {
  position: absolute;
  top: 45px;
  right: 20px;
  z-index: 350;
  min-width: 300px;
  min-height: auto;
  background-color: $notifications-bg;
}
</style>
