import { createApp } from 'vue'
import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import StartGame from './routes/StartGame/StartGame.vue'
import Players from './routes/Players/Players.vue'
import AddPlayer from './routes/AddPlayer/AddPlayer.vue'
import EditPlayer from './routes/EditPlayer/EditPlayer.vue'
import Results from './routes/Results/Results.vue'
import DKToast from 'vue-dk-toast';

const routes = [
  { path: '/', component: StartGame },
  { path: '/7W/', component: StartGame },
  { path: '/7W/:session_id', component: Players },
  { path: '/7W/:session_id/add', component: AddPlayer },
  { path: '/7W/:session_id/edit/:wonder_id', component: EditPlayer },
  { path: '/7W/:session_id/results', component: Results },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App)
    .use(router)
    .use(DKToast)
    .mount('#app')