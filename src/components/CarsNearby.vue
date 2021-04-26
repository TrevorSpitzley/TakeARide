<template>
  <div id="contents">
    <h2>Available Cars!</h2>
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
        <tr
          v-for="(x, pos) in resArr"
          :key="pos"
          v-bind:class="`${getColor(x)}`"
        >
          <td>{{ x.carMake }}</td>
          <td>{{ x.carModel }}</td>
          <td>{{ x.carYear }}</td>
          <td>{{ x.carColor }}</td>
          <td>{{ x.status }}</td>
          <td>{{ x.owner }}</td>
          <td>
            <button v-if="x.boolStatus" v-on:click="pickThisCar(x)">
              Reserve this car
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="carPicked" id="checkout">
      <Checkout v-bind:currCar="chosenCar"></Checkout>
      <div id="buttons">
        <button v-on:click="rentThisCar(chosenCar)">Rent Me!</button
        ><button v-on:click="goBackToList()">Not Interested</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";

import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";

import { FirebaseAuth } from "@firebase/auth-types";
import "firebase/auth";

import Checkout from "./Checkout.vue";

@Component({
  components: {
    Checkout,
  },
})
// @Component
export default class CarsNearby extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  $router: any;
  private resArr: any[] = [];
  private chosenCar: any;
  private carPicked = false;
  private docName!: string;

  goBackToList(): void {
    this.carPicked = false;
    this.chosenCar = null;
    this.docName = "";
  }

  rentThisCar(x: any): void {
    if (this.docName!.length > 0 && x.status === "Open") {
      this.$appDB
        .collection("users/test/seller_cars")
        .doc(this.docName)
        .update({
          status: "Closed",
          //To make the rent button disappear
          boolStatus: false,
        });
    }
    this.goBackToList();
  }

  pickThisCar(x: any): void {
    console.log(x);
    console.log(x.name);
    this.chosenCar = x;
    this.docName = x.name;
    this.carPicked = true;
  }

  mounted(): void {
    this.$appDB
      .collection(`users/test/seller_cars`)
      .orderBy("make") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.resArr.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            //changed from const to var
            var rtn = qds.data();
            this.resArr.push({
              carMake: rtn.make,
              carModel: rtn.model,
              carYear: rtn.year,
              carColor: rtn.color,
              status: rtn.status,
              owner: rtn.owner,
              boolStatus: rtn.boolStatus,
              name: rtn.name,
            });
          }
        });
      });
  }

  getColor(art: any) {
    if (art.status === "Closed") return "red";
  }
}
</script>

<style scoped>
thead {
  text-decoration: underline;
  background-color: white;
}

tbody tr:nth-child(even) {
  background-color: lightskyblue;
}
tbody tr:nth-child(odd) {
  background-color: palevioletred;
}
</style>
