<template>
  <v-app>
  <div id="app">
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <v-main>
          <router-view></router-view>
    </v-main>
  </div>
  </v-app> 
</template>



<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
});
</script>
