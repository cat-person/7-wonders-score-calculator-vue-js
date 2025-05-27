import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";

import App from "./App.vue";
import StartGame from "./routes/StartGame/StartGame.vue";
import Players from "./routes/Players/Players.vue";
import AddPlayer from "./routes/AddPlayer/AddPlayer.vue";
import EditPlayer from "./routes/EditPlayer/EditPlayer.vue";
import Results from "./routes/Results/Results.vue";
import longpress from "./utils/longpress";

const routes = [
  { path: "/", component: StartGame },
  { path: "/:session_id", component: Players },
  { path: "/:session_id/add", component: AddPlayer },
  { path: "/:session_id/edit/:wonder_id", component: EditPlayer },
  { path: "/:session_id/results", component: Results },
];

// Vue.directive("longpress", longpress({ delay: 300, interval: 50 }));

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(App).use(longpress).use(router).mount("#app");
