import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { auth } from './firebaseConfig'

import {
  faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload,
  faUserSecret,
  faEllipsisV,
  faSignOutAlt,
  faBars,
  faExclamation,
  faFileAlt,
  faDrumstickBite,
  faHamburger,
  faPlus,
  faMinus,
  faLink,
  faBook,
  faTag,
  faHashtag,
  faBlender,
  faCookie,
  faCookieBite,
  faHeart,
  faAngleUp,
  faBookOpen,
  faUtensils,
  faStopwatch,
  faPenAlt,
  faTrashAlt,
  faTrash,
  faCloudUploadAlt,
  faCog,
  faTimes,

} from '@fortawesome/free-solid-svg-icons'

library.add(
  faCheck, faCheckCircle, faInfoCircle, faExclamationTriangle, faExclamationCircle,
  faArrowUp, faAngleRight, faAngleLeft, faAngleDown,
  faEye, faEyeSlash, faCaretDown, faCaretUp, faUpload,
  faUserSecret,
  faEllipsisV,
  faSignOutAlt,
  faBars,
  faExclamation,
  faFileAlt,
  faDrumstickBite,
  faHamburger,
  faPlus,
  faMinus,
  faLink,
  faBook,
  faTag,
  faHashtag,
  faBlender,
  faCookie,
  faCookieBite,
  faHeart,
  faAngleUp,
  faBookOpen,
  faUtensils,
  faStopwatch,
  faPenAlt,
  faTrashAlt,
  faTrash,
  faCloudUploadAlt,
  faCog,
  faTimes,
)

Vue.component('vue-fontawesome', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas'
})
Vue.use(require('vue-moment'))

let app
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})
