<template>
 <v-app>
    <!-- <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer> -->

    <v-app-bar app>
      <span class="hidden-sm-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar">
        </v-app-bar-nav-icon>
      </span>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
       <div id="area">
      <section>
        <AddCar></AddCar>
        </section>
        <section>
        <Reservations></Reservations>
      </section>
    </div>
    </v-main>
       
  </v-app>

  <!-- <div id="contents">
    <div id="header">
      <h2>Insert centered name here</h2>
    </div>
    <button v-on:click="goBack()">Go Back</button>
    <div id="area">
      <section>
        <AddCar></AddCar>
        </section>
        <section>
        <Reservations></Reservations>
      </section>
    </div>
  </div> -->
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";

import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";

import { FirebaseAuth } from "@firebase/auth-types";
import "firebase/auth";

import AddCar from "./AddCar.vue";
import Reservations from "./Reservations.vue";



//@Component
// export default class Seller extends Vue {
//   readonly $appDB!: FirebaseFirestore;
//   readonly $appAuth!: FirebaseAuth;
//   $router: any;

//   goBack(): void {
//     this.$router.back();
//   }
// }
export default {
  name: "Seller",
  components: {
    AddCar,
     Reservations,
  },
  
  data(){
    return {
      appTitle: 'Take A Ride',
      sidebar: false,
      menuItems: [
          { title: 'Seller', path: '/Seller',},
          { title: 'Client', path: '/Client',},
     ]
    }
  },
};
</script>

}

<style scoped>
#area {
  display: grid;
  grid-template-columns: auto auto;
  grid-template-areas: "add" "display";
}
</style>
