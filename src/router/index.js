import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SignUp from '@/components/Sign_Up.vue'
import Login from '@/components/Login.vue'
import VP from '@/components/Videoplayer.vue'
import Search from '@/components/Search.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/vp',
    component: VP
  },
  {
  path: '/search',
  component: Search,
  params: true
}
]

const router = new VueRouter({
  routes
})

export default router
