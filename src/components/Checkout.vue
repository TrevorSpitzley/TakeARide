<template>
  <div id="contents">
    <table>
      <thead>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Price Per Hour</th>
        <th>Status</th>
        <th>Owner</th>
      </thead>
      <tbody>
        <tr>
          <td>{{ currCar.carMake }}</td>
          <td>{{ currCar.carModel }}</td>
          <td>{{ currCar.carYear }}</td>
          <td>{{ currCar.carColor }}</td>
          <td>${{ currCar.pricePerHour }}.00</td>
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

<style scoped>
#contents {
  padding-top: 5em;
}
thead {
  text-decoration: underline;
  background-color: white;
}
tbody {
  border: 2px solid hsl(281, 90%, 50%);
  border-radius: 0.5em;
  box-shadow: 3px 5px 6px 7px hsla(271, 55%, 50%, 0.4);
}
tbody td {
  border: 2px solid black;
  background-color: lightskyblue;
}
</style>
