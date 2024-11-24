import { createRouter, createWebHistory } from 'vue-router'
import CV from '../views/ResultTable.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'score',
      component: CV
    },
  ]
})

export default router
