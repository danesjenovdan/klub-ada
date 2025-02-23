import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
// import HekatonView from "../views/HekatonView.vue";
import AboutUsView from "../views/AboutUsView.vue";
import ActivitiesView from '../views/ActivitiesView.vue';
import EventsView from '../views/EventsView.vue';
import PartnershipsView from "../views/PartnershipsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/o-nas',
      name: 'o-nas',
      component: AboutUsView,
    },
    {
      path: '/partnerstvo',
      name: 'partnerstvo',
      component: PartnershipsView,
    },
    {
      path: '/aktivnosti',
      name: 'aktivnosti',
      component: ActivitiesView,
    },
    {
      path: '/dogodki',
      name: 'dogodki',
      component: EventsView,
    },
    // {
    //   path: '/hekaton',
    //   name: 'hekaton',
    //   component: HekatonView,
    // },
  ],
});

export default router;
