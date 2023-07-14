import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import login from '../views/login.vue'
import signUp from '../views/signUp.vue'
import board from '../views/board.vue'
import thumbUp from '../views/thumbUp.vue'
import technique from '../views/technique.vue'
import test from '../views/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainView
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: signUp
  },
  {
    path: '/board',
    name: 'board',
    component: board
  },
  {
    path: '/technique',
    name: 'technique',
    component: technique
  },
  {
    path: '/thumbUp',
    name: 'thumbUp',
    component: thumbUp
  },
  {
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

export default router
