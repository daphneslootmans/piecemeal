<template>
  <transition name="fade">
    <div class="notification-tray" v-on-clickaway="clickAway" v-if="notifications.some(note => note.unread)">
      <b-notification v-for="notification in notifications"
                      :active.sync="notification.unread"
                      aria-close-label="Close notification"
                      @close="updateNotification(notification)"
      >
        <div class="body">
          {{ notification.message }} <br>
          <div class="small">{{ notification.timestamp.toDate() | moment('DD-MM-YYYY HH:mm') }}</div>
        </div>
      </b-notification>
    </div>
  </transition>
</template>

<script>
import { notificationCollection } from '@/firebaseConfig.js'
import { mixin as clickaway } from 'vue-clickaway';
import { mapMutations } from 'vuex'

export default {
  name: 'NotificationTray',
  props: {
    notifications: {
      type: Array
    }
  },
  mixins: [ clickaway ],
  data () {
    return {}
  },
  computed: {},
  methods: {
    ...mapMutations({
      closeNotifications: 'closeNotifications'
    }),
    updateNotification (notification) {
      this.loading = true
      notification.unread = false
      let note = notificationCollection.doc(notification.id)
      note.update(notification)
        .then(() => {
          this.loading = false
        })
    },
    clickAway (event) {
      console.log(event)
      if (!event.target.parentElement.classList.contains('notification-toggle')) this.closeNotifications()
    }
  },
  watch: {}
}
</script>

<style scoped lang="scss">
.notification-tray {
  position: absolute;
  top: 55px;
  right: 40px;
  z-index: 350;
  width: 400px;
  min-height: auto;
  background-color: rgba($grey-medium, 0.6);
  border: 1px solid $grey-light;
  border-radius: $toast-border-radius;

  .notification {
    background: $notifications-bg;
    margin-bottom: 0;
    border-radius: 0;
    border-bottom: 1px solid $grey-light;

    &:first-child {
      border-top-left-radius: $toast-border-radius;
      border-top-right-radius: $toast-border-radius;
    }

    &:last-child {
      border-bottom-left-radius: $toast-border-radius;
      border-bottom-right-radius: $toast-border-radius;
      border-bottom: none;
    }
  }

  .body {
    display: flex;
    flex-flow: row wrap;
  }

  .small {
    font-size: 0.9em;
    color: $grey-medium;
    margin-left: auto;
  }
}
</style>
