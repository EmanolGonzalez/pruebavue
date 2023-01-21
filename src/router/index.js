import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/film/:id',
    name: 'film',
    component: () => import(/* webpackChunkName: "film" */ '../views/FilmView.vue')
  },
  {
    path: '/character/:id',
    name: 'character',
    component: () => import(/* webpackChunkName: "character" */ '../views/CharacterView.vue')
  },
  {
    path: '/vehicle/:id',
    name: 'vehicle',
    component: () => import(/* webpackChunkName: "vehicle" */ '../views/VehicleView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
