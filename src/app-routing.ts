import Vue from 'vue'
import VueRouter, { RouteConfig } from "vue-router";
import AppLogin from './components/AppLogin.vue';
import Seller from './components/Seller.vue';
import Client from './components/Client.vue';
import ClientMirror from './components/ClientMirror.vue';
import Checkout from './components/Checkout.vue';
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
  {
    name: "ClientMirror Vue",
    path: "/ClientMirror",
    component: ClientMirror,
  },

];

export const AppRouter = new VueRouter({
  routes: myRoutes,
  mode: "history"
});
