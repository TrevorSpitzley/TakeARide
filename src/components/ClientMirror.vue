<template>
 <v-app>
    <v-navigation-drawer v-model="sidebar" app>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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

    <v-content>
        <CarsNearby></CarsNearby>
    </v-content>
       
  </v-app>
</template>

   <!-- <div id="contents">
    <button v-on:click="goBack()">Go Back</button>
    <div id="carsnearby">
      <CarsNearby></CarsNearby>
    </div>
  </div> -->


<script lang="ts">
import { Component, Vue, Prop, } from "vue-property-decorator";
import CarsNearby from './CarsNearby.vue';

export default {
  name: "ClientMirror",
  components: {
     CarsNearby,
  },
  
  data(){
    return {
      appTitle: 'Take A Ride',
      sidebar: false,
      menuItems: [
         { title: 'Client', path: '/ClientMirror',},
          { title: 'Seller', path: '/Seller',},
          { title: 'Logout', path: '/', icon: 'mdi-logout'},
     ]
    }
  },
};

// previous method before vuetify
// @Component({
//   components: {
//     CarsNearby,
//   },
// })


// export default class Seller extends Vue{
//     $router: any;

//   goBack(): void{
//     this.$router.back();
//   }
// }
</script>

<style scoped>

</style>