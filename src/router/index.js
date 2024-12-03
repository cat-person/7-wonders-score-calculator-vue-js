import { createRouter, createWebHistory } from 'vue-router'
// import AddPlayer from '../components/AddPlayer.vue'
import Players from '../components/Players.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'score',
      component: Players
    },
  ]
})

export default router
