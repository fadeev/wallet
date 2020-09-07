import Vue from "vue";
import VueRouter from "vue-router";
import Portfolio from "@/views/Portfolio.vue";
import Validators from "@/views/Validators.vue";
import ValidatorsItem from "@/views/ValidatorsItem.vue";
import Transactions from "@/views/Transactions.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/portfolio",
  },
  {
    path: "/portfolio",
    component: Portfolio,
  },
  {
    path: "/validators",
    component: Validators,
  },
  {
    path: "/validators/:address",
    component: ValidatorsItem,
    props: true,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
