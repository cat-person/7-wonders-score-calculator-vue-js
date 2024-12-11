import { createRouter, createWebHistory } from 'vue-router'
// import AddPlayer from '../components/AddPlayer.vue'
import Players from './Players/Players.vue'
import AddPlayer from './AddPlayer/AddPlayer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'players',
      component: Players
    },
    {
      path: '/',
      name: 'home',
      component: Players
    },
    {
      path: '/AddPlayer',
      name: 'add_player',
      component: AddPlayer
    },
  ]
})

export default router
