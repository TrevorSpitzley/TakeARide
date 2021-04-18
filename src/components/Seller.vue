<template>
  <div id="contents">
    <div id="header">
      <h2>Insert centered name here</h2>
    </div>
    <button v-on:click="goBack()">Go Back</button>
    <AddCar></AddCar>
    <Reservations></Reservations>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";

import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";

import { FirebaseAuth } from "@firebase/auth-types";
import "firebase/auth";

import AddCar from "./AddCar.vue";
import Reservations from './Reservations.vue';

@Component({
  components: {
    AddCar, Reservations,
  },
})

//@Component
export default class Seller extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  $router: any;

  goBack(): void {
    this.$router.back();
  }
}
</script>

<style scoped></style>
