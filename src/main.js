import { createApp } from 'vue'
import { createMemoryHistory, createRouter } from 'vue-router'

import App from './App.vue'
import StartGame from './routes/StartGame/StartGame.vue'
import Players from './routes/Players/Players.vue'
import AddPlayer from './routes/AddPlayer/AddPlayer.vue'
import EditPlayer from './routes/EditPlayer/EditPlayer.vue'
import Results from './routes/Results/Results.vue'
import DKToast from 'vue-dk-toast';

const routes = [
  { path: '/', component: StartGame },
  { path: '/:session_id', component: Players },
  { path: '/:session_id/add_player', component: AddPlayer },
  { path: '/:session_id/edit/:wonder_id', component: EditPlayer },
  { path: '/:session_id/results', component: Results },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

createApp(App)
    .use(router)
    .use(DKToast)
    .mount('#app')