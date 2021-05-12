import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebaseConfig'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Sidebar from '../components/Sidebar'
import Settings from '../views/Settings.vue'
import AddRecipe from '../components/AddRecipe'
import EditRecipe from '../components/EditRecipe'
import ViewRecipe from '../components/ViewRecipe'
import FriendList from '../components/FriendList'
import FriendSidebar from '../components/FriendSidebar'
import NotFoundComponent from '../views/NotFoundComponent'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: NotFoundComponent
  },
  {
    path: '/',
    redirect: '/recipes'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/recipes',
    name: 'recipes',
    components: {
      default: AddRecipe,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true
    }
  },
  { path: '/recipes/:id',
    name: 'recipe',
    components: {
      default: ViewRecipe,
      sidebar: Sidebar
    },
    meta: {
      requiresAuth: true
    }
  },
  { path: '/recipes/:id/edit',
    name: 'edit-recipe',
    components: {
      default: EditRecipe,
      sidebar: Sidebar
    },
    props: {
      default: {
        editing: true
      }
    },
    query: {
      editing: true
    },
    meta: {
      requiresAuth: true
    }
  },
  { path: '/friends',
    name: 'friend-list',
    components: {
      default: FriendList,
      sidebar: FriendSidebar
    },
    meta: {
      requiresAuth: true
    }
  },
  { path: '/friends/:friendId/:recipeId',
    name: 'friend-recipe',
    components: {
      default: ViewRecipe,
      sidebar: FriendSidebar
    },
    props: {
      default: {
        editing: true
      }
    },
    query: {
      editing: true
    },
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'settings',
    component: Settings,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  linkExactActiveClass: "is-active"
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
