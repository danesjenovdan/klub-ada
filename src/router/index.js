import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HekatonView from "../views/HekatonView.vue";
import AboutUsView from "../views/AboutUsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/o-nas",
      name: "o-nas",
      component: AboutUsView,
    },
    {
      path: "/hekaton",
      name: "hekaton",
      component: HekatonView,
    },
  ],
});

export default router;
