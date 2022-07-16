// Import Vue & VueRouter
import Vue from 'vue'
import VueRouter from 'vue-router'
// Import des pages d'inscription, connexion et du feed
import SignUp from "@/components/SignUp.vue"
import Login from "@/components/Login.vue"
import Feed from "@/components/Feed.vue"

Vue.use(VueRouter)

// Déclaration des différentes pages avec leur chemin
const routes = [
  {
    path: '/',
    name: 'Feed',
    component: Feed
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
