<template>
  <div id="contents">
    <h2 id="title">Add New Car</h2>
    <h4>Make <input type="text" v-model="carMake" placeholder="Enter make here" /></h4>
    <h4>Model <input type="text" v-model="carModel" placeholder="Enter model here" /></h4>
    <h4>Year <input type="text" v-model="carYear" placeholder="Enter year here" /></h4>
    <h4>Color <input type="text" v-model="carColor" placeholder="Enter color here" /></h4>
    <br />
    <button v-on:click="addCar()">Submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";

import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";

import { FirebaseAuth } from "@firebase/auth-types";
import "firebase/auth";

@Component

export default class AddCar extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  $router: any;

  private carMake = "";
  private carModel = "";
  private carYear = "";
  private carColor = "";

  addCar(): void {
    this.$appDB.collection(`users/test/seller_cars`).add({
      make: this.carMake,
      model: this.carModel,
      year: this.carYear,
      color: this.carColor,
      status: "Open",
      owner: "Test",
      boolStatus: true,
    });
  }
}
</script>

<style scoped>
#contents {
  border: 1px solid black;
  border-radius: 5%;
}

#title {
  text-decoration: underline;
}
</style>
