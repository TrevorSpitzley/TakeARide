import Vue from 'vue'
import VueRouter, { RouteConfig } from "vue-router";
import AppLogin from './components/AppLogin.vue';
import Seller from './components/Seller.vue';
import Client from './components/Client.vue';
Vue.use(VueRouter);

const myRoutes: Array<RouteConfig> = [
  {
    name: "App Login",
    path: "/",
    component: AppLogin,
  },
  {
    name: "Seller Vue",
    path: "/Seller",
    component: Seller,
  },
  {
    name: "Client Vue",
    path: "/Client",
    component: Client,
  },
];

export const AppRouter = new VueRouter({
  routes: myRoutes,
  mode: "history"
});
