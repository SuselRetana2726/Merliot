import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Juego from '../views/Game.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/juego/:juego',
    name: 'Juego',
    component: Juego,
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(), // Ideal para GitHub Pages
  routes
})

export default router