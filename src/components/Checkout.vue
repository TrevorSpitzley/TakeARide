<template>
  <div id="contents">
    <table>
      <thead>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Status</th>
        <th>Owner</th>
      </thead>
      <tbody>
        <tr>
          <td>{{ currCar.carMake }}</td>
          <td>{{ currCar.carModel }}</td>
          <td>{{ currCar.carYear }}</td>
          <td>{{ currCar.carColor }}</td>
          <td>{{ currCar.status }}</td>
          <td>{{ currCar.owner }}</td>
        </tr>
      </tbody>
    </table>
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
export default class Checkout extends Vue {
  @Prop() currCar: any;

}
</script>

<style scoped></style>
