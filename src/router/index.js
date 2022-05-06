import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import CustomerCard from "../views/CustomerCard.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cards",
    name: "CustomerCard",
    component: CustomerCard,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
