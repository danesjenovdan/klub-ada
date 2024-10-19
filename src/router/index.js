import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import HekatonView from "../views/HekatonView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import PartnershipsView from "../views/PartnershipsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about-us",
      name: "about-us",
      component: AboutUsView,
    },
    {
      path: "/partnerships",
      name: "partnerships",
      component: PartnershipsView,
    },
    {
      path: "/hekaton",
      name: "hekaton",
      component: HekatonView,
    },
  ],
});

export default router;
