<template>
  <div id="contents">
    <br />
    <v-container class="black darken-2 my-4">
      <v-row class="purple lighten-2 ma-1" justify="center">
        <v-sheet elevation="5" class="pa-10 my-3">
          <v-form v-model="dataReady">
            <h3 id="title">Add New Car</h3>
            <v-row class="flex-column" align="end">
              <v-col>
                <v-text-field
                  prepend-icon="mdi-car"
                  type="text"
                  label="Car Make"
                  v-model="carMake"
                />
                <v-text-field
                  type="text"
                  label="Car Model"
                  v-model="carModel"
                />
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-calendar"
                  type="text"
                  label="Year"
                  v-model="carYear"
                />
              </v-col>
              <v-col>
                <v-slider
                  min="1950"
                  max="2022"
                  v-model="carYear"
                  color="blue"
                  thumb-label="carYear"
                />
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-spray"
                  type="text"
                  label="Color"
                  v-model="carColor"
                />
              </v-col>
              <v-col>
                <v-text-field
                  prepend-icon="mdi-money"
                  type="number"
                  label="Price per Hour"
                  v-model="carPrice"
                />
              </v-col>
              <v-col>
                <v-slider
                  min="50"
                  max="500"
                  v-model="carPrice"
                  color="blue"
                  thumb-label="carPrice"
                />
              </v-col>
              <v-col cols="auto">
                <v-btn v-on:click="addCar()" outlined :disabled="!dataReady"
                  >Add Car</v-btn
                >
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-row>
    </v-container>
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
  private sellerID = this.$appAuth.currentUser!.email;

  private carMake = "";
  private carModel = "";
  private carYear = "";
  private carColor = "";
  private carPrice = 1;

  addCar(): void {
    const docName = `${this.carMake},${this.carModel},${this.carYear}`;
    this.$appDB
      .collection(`users/test/seller_cars`)
      .doc(docName)
      .set({
        make: this.carMake,
        model: this.carModel,
        year: this.carYear,
        color: this.carColor,
        status: "Open",
        owner: this.sellerID!.split("@")[0],
        boolStatus: true,
        name: docName,
        pricePerHour: this.carPrice,
      });
  }
}
</script>

<style scoped>
#title {
  text-decoration: underline;
  text-align: center;
}
#contents {
  display: inline-block;
  text-align: right;
  border-radius: 0.5em;
  padding: 1em;
  margin: 0.6em;
}
</style>
