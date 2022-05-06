import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CustomerCards from "../views/CustomerCards.vue";
import CustomerInfo from "../views/CustomerInfo.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cards",
    name: "CustomerCard",
    component: CustomerCards,
  },
  {
    path: "/info/",
    name: "CustomerInfo",
    component: CustomerInfo,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
