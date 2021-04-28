<template>
  <div class="id">
    <div id="contents">
      <h2>Available Cars!</h2>
      <table>
        <thead>
          <th>Make</th>
          <th>Model</th>
          <th>Year</th>
          <th>Color</th>
          <th>Price Per Hour</th>
          <th>Status</th>
          <th>Owner</th>
          <th>Click here to reserve!</th>
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
            <td>${{ x.pricePerHour }}.00</td>
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
        <div class="buttons">
          <button v-on:click="rentThisCar(chosenCar)">Rent Me!</button>
          <button v-on:click="goBackToList()">Not Interested</button>
        </div>
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
    // console.log(x);
    // console.log(x.name);
    if (this.chosenCar) {
      this.chosenCar = null;
      this.docName = "";
      this.carPicked = false;
    }
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
              pricePerHour: rtn.pricePerHour,
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
.id {
  text-align: center;
}
#contents {
  margin-right: auto;
  margin-left: auto;
  display: inline-block;
}
div.buttons button {
  border: 2px solid hsl(281, 90%, 50%);
  border-radius: 0.5em;
  box-shadow: 3px 5px 6px 7px hsla(271, 55%, 50%, 0.4);
  background-color: lightskyblue;
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
