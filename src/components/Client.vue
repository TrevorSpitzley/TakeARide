<template>
  <div id="contents">
    <button v-on:click="goBack()">Go Back</button>
    <div id="carsnearby">
      <CarsNearby></CarsNearby>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import CarsNearby from './CarsNearby.vue';

@Component({
  components: {
    CarsNearby,
  },
})


export default class Seller extends Vue{
    $router: any;

  goBack(): void{
    this.$router.back();
  }
}
</script>

<style scoped>

</style>