<template>
  <div id="contents">
    <table>
      <thead>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Status</th>
        <th>Remove Listing</th>
      </thead>
      <tbody>
        <tr v-for="(x, pos) in resArr" :key="pos" v-bind:class="`${getColor(x)}`">
          <td>{{ x.carMake }}</td>
          <td>{{ x.carModel }}</td>
          <td>{{ x.carYear }}</td>
          <td>{{ x.carColor }}</td>
          <td>
            <button v-if="!x.boolStatus" v-on:click="backToMarket(x)">
              Re-Open Status
            </button>
            <label v-if="x.boolStatus">
              Not currently reserved
            </label>
          </td>

          <td>
            <button v-on:click="deleteListing(x)">
              Remove Listing
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>{{ message }}</div>
    <!-- {{resArr.length}}<p>res array length</p>
    <v-data-table :headers="hArray" :items="resArr"> </v-data-table> -->
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";

import { QueryDocumentSnapshot } from "@firebase/firestore-types";
import { QuerySnapshot } from "@firebase/firestore-types";

import { FirebaseAuth } from "@firebase/auth-types";
import "firebase/auth";

@Component
export default class Reservations extends Vue {
  readonly $appDB!: FirebaseFirestore;
  readonly $appAuth!: FirebaseAuth;
  $router: any;
  private message = "";
  private sellerID = this.$appAuth.currentUser!.email;
  resArr: any[] = [];

  checkCar(x: any): boolean {
    return !x.boolStatus;
  }

  getColor(art: any) {
    if (art.status === "Closed") return "red";
  }

  backToMarket(x: any): void {
    if (x.name.length > 0 && x.boolStatus === false) {
      this.$appDB
        .collection(`users/test/seller_cars`)
        .doc(x.name)
        .update({
          status: "Open",
          //To make the rent button disappear
          boolStatus: true,
        });
    }
  }

  deleteListing(x: any): void {
    if (x.name.length > 0 && this.resArr.length > 1) {
      this.$appDB
        .collection(`users/test/seller_cars`)
        .doc(x.name)
        .delete();
    }
    if (this.resArr.length <= 1) {
      this.showMessage(
        `Cannot remove only listing. Must have one listing at all times.`
      );
    }
  }

  showMessage(m: string): void {
    this.message = m;
    setTimeout(() => {
      // Auto disappear after 5 seconds
      this.message = "";
    }, 5000);
  }

  //Draws data on load
  mounted(): void {
    this.$appDB
      .collection(`users/test/seller_cars`)
      .orderBy("status") // Sort by category name
      .onSnapshot((qs: QuerySnapshot) => {
        this.resArr.splice(0); // remove old data
        qs.forEach((qds: QueryDocumentSnapshot) => {
          if (qds.exists) {
            //changed from const to var
            var rtn = qds.data();
            console.log("testing", rtn.boolStatus);
            if (rtn.owner === this.sellerID!.split("@")[0]) {
              this.resArr.push({
                carMake: rtn.make,
                carModel: rtn.model,
                carYear: rtn.year,
                carColor: rtn.color,
                owner: rtn.owner,
                status: rtn.status,
                boolStatus: rtn.boolStatus,
                name: rtn.name,
              });
            }
          }
        });
      });
  }
}
</script>

<style scoped></style>
<style scoped>
#contents {
  display: inline-block;
  border: 2px solid hsl(281, 90%, 50%);
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
  box-shadow: 3px 5px 6px 7px hsla(271, 55%, 50%, 0.4);
  align-items: center;
  text-align: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 7em;
}
thead {
  text-decoration: underline;
  background-color: white;
}
tbody td {
  border: 2px solid black;
  background-color: lightskyblue;
}
tbody tr {
  background-color: lightskyblue;
}

</style>
