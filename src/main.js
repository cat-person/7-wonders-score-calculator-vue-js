import { createApp } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import { createI18n } from "vue-i18n";

import App from "./App.vue";
import StartGame from "./routes/StartGame/StartGame.vue";
import Players from "./routes/Players/Players.vue";
import AddPlayer from "./routes/AddPlayer/AddPlayer.vue";
import EditPlayer from "./routes/EditPlayer/EditPlayer.vue";
import Results from "./routes/Results/Results.vue";
import longpress from "./utils/longpress";
import locales from "./assets/locales";

const routes = [
  { path: "/", component: StartGame },
  { path: "/:session_id", component: Players },
  { path: "/:session_id/add", component: AddPlayer },
  { path: "/:session_id/edit/:wonder_id", component: EditPlayer },
  { path: "/:session_id/results", component: Results },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const i18n = createI18n({
  locale: "ru", // default language
  fallbackLocale: "ru",
  messages: locales,
  silentTranslationWarn: process.env.NODE_ENV === "production",
});

createApp(App).use(longpress).use(router).use(i18n).mount("#app");

export default i18n;
