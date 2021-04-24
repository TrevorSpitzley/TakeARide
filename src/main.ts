import Vue from 'vue'
import App from './App.vue'
import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
import { AppRouter } from "./app-routing";
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import vuetify from './plugins/vuetify';
Vue.use(Vuetify);

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDoRbbYkzZCcbrQ7zxQNrEtzjKhmWWofGQ",
  authDomain: "finalproject-9d7cf.firebaseapp.com",
  projectId: "finalproject-9d7cf",
  storageBucket: "finalproject-9d7cf.appspot.com",
  messagingSenderId: "434244504049",
  appId: "1:434244504049:web:226387663860147bb25c50",
  measurementId: "G-6D9BEKNY8Q"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.prototype.$appDB = firebase.firestore();
Vue.prototype.$appAuth = firebase.auth();


new Vue({
  router: AppRouter,
  vuetify,
  render: h => h(App)
}).$mount('#app')
