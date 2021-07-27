import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/good/list',
    name: 'goodList',
    component: () => import(/* webpackChunkName: "goodList" */ '../views/goodList')
  },
  {
    path: '/upload',
    name: 'upload',
    // route level code-splitting 
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "form" */ '../views/upload')
  },
  {
    path: '/slot',
    name: 'slot',
    component: () => import(/* webpackChunkName: "slot" */ '../views/slot')
  },
  {
    path: '/keyForLoop',
    name: 'keyForLoop',
    component: () => import(/* webpackChunkName: "keyForLoop" */ '../views/keyForLoop')
  },
  {
    path: '/keyForLoop2',
    name: 'keyForLoop2',
    component: () => import(/* webpackChunkName: "keyForLoop2" */ '../views/keyForLoop/index2')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
