<template>
  <v-app>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <v-main>
          <router-view></router-view>
    </v-main>
  </div>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
//import HelloWorld from './components/HelloWorld.vue';


export default Vue.extend({
  name: 'App',

  components: {
    //HelloWorld,
  },

  data: () => ({
    //
  }),
});
</script>