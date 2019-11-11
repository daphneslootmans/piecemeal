import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const fb = require('./firebaseConfig')

import {
  faUserSecret,
  faEyeSlash,
  faEye,
  faEllipsisV,
  faSignOutAlt,
  faBars,
  faExclamation,
  faFileAlt
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faUserSecret,
  faEyeSlash,
  faEye,
  faEllipsisV,
  faSignOutAlt,
  faBars,
  faExclamation,
  faFileAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      vuetify,
      render: h => h(App)
    })
  }
})
