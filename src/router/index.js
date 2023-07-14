import Vue from 'vue'
import VueRouter from 'vue-router'
import MainView from '../views/MainView.vue'
import login from '../views/login.vue'
import signUp from '../views/signUp.vue'
import board from '../views/board.vue'
import test from '../views/test.vue'
import technique from '../views/technique.vue'

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
    path: '/test',
    name: 'test',
    component: test
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
