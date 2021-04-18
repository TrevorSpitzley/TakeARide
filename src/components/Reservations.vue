<template>
  <div id="contents">
    <!-- <table>
      <thead>
        <th>Make</th>
        <th>Model</th>
        <th>Year</th>
        <th>Color</th>
        <th>Status</th>
      </thead>
      <tbody>
        <tr v-for="(x,pos) in resArr" :key="pos">
          <td>{{x.carMake}}</td>
          <td>{{x.carModel}}</td>
          <td>{{x.carYear}}</td>
          <td>{{x.carColor}}</td>
          <td>{{x.status}}</td>
        </tr>
      </tbody>
    </table> -->
    <!-- <v-data-table :headers="hArray" :items="resArr"> </v-data-table> -->
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

  hArray = [
    { text: "Car Make", value: 'carMake' },
    { text: "Car Model", value: 'carModel' },
  ];
  resArr: any[] = [];

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
            this.resArr.push({
              carMake: rtn.make,
              carModel: rtn.model,
              carYear: rtn.year,
              carColor: rtn.color,
              status: rtn.status,
            });
          }
        });
      });
  }
}
</script>

<style scoped></style>
