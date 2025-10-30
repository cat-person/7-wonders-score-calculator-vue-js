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
import QRPopup from "./routes/Common/components/QRPopup.vue";

const routes = [
  {
    path: "/",
    component: StartGame,
    children: [
      {
        path: "popup",
        name: "popup_start",
        component: QRPopup,
        query: { sessionId: "sessionId" },
      },
    ],
  },
  {
    path: "/list/",
    query: { sessionId: "sessionId" },
    component: Players,
    children: [
      {
        path: "popup",
        name: "popup",
        component: QRPopup,
        query: { sessionId: "sessionId" },
      },
    ],
  },

  { path: "/add", component: AddPlayer, query: { sessionId: "sessionId" } },
  { path: "/edit/", component: EditPlayer, query: { sessionId: "sessionId" } },
  { path: "/results", component: Results, query: { sessionId: "sessionId" } },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const i18n = createI18n({
  locale: "en", // default language
  fallbackLocale: "en",
  messages: locales,
  silentTranslationWarn: process.env.NODE_ENV === "production",
});

createApp(App).use(longpress).use(router).use(i18n).mount("#app");

export default i18n;
