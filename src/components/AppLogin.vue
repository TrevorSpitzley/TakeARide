<template>
<v-parallax height="1000" src="https://wallpaperaccess.com/full/813245.jpg">
  <h1>Welcome to <br> Take-A-Ride</h1>
  <div id="AppLogin" align="center">
    <v-container>
      <v-row>
        <v-sheet elevation="4" class="pa-3 my-3">
          <v-form v-model="dataReady">
            <v-row class="flex-column" align="end">
              <v-col>
                <v-text-field prepend-icon="mdi-email" type="text"
                  label="Email" v-model="uMail" :rules="emailRules" />
              </v-col>
              <v-col>
                <v-text-field prepend-icon="mdi-lock" type="password"
                  label="Password" v-model="uPass" :rules="pwRules" />
              </v-col>
              <v-col cols="auto">
                <v-btn v-on:click="authenticate" outlined :disabled="!dataReady">Login</v-btn>
                <v-btn v-on:click="createAccount" :disabled="noInput">Sign Up</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-sheet>
      </v-row>
    </v-container>
    <div>{{message}}</div>
  </div>
</v-parallax>
</template>
<script lang="ts">

import { Component, Vue } from "vue-property-decorator";
import { FirebaseAuth, UserCredential } from "@firebase/auth-types";
import "firebase/auth";
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify, Vue)

const EM_REGEX = /([0-9a-z]+)@([a-z0-9]+\.)+(edu|com|org)$/;

@Component
export default class AppLogin extends Vue {
  readonly $appAuth!: FirebaseAuth;
  private message = "";
  $router: any;
  emRegex = EM_REGEX;
  dataReady = false;
  uMail = "";
  uPass = "";
  emailRules = [
    function (x: string): boolean | string {
      return x.length > 0 ? true : "Email is required";
    },
    function (x: string): boolean | string {
      const matchLen = x.match(EM_REGEX)?.length ?? 0;
      return matchLen > 0 ? true : ".edu, .com, org expected";
    },
    (x: string): boolean => x.indexOf("@") > 0,
  ];
  pwRules = [
    function (x: string): boolean | string {
      return x.length >= 6 ? true : "Password (at least 6 chars) is required";
    },
  ];
get noInput(): boolean {
  return this.uMail.length === 0 || this.uPass.length === 0;
}

createAccount(): void {
  this.$appAuth
    .createUserWithEmailAndPassword(this.uMail, this.uPass)
    .then((u: UserCredential) => {
      this.showMessage(`User create UID ${u.user?.uid}`);
      this.showMessage(`Please sign in with your email: ${u.user?.email}`);
    })
    .catch((err: any) => {
      this.showMessage(`Unable to create account ${err}`);
    });    
}

authenticate(): void {
  this.$appAuth
    .signInWithEmailAndPassword(this.uMail, this.uPass)
    .then((u: UserCredential) => {
      this.showMessage(`Login successful UID ${u.user?.uid}`);
      if (`${u.user?.email}`.includes("@takearide.com")){
        this.$router.push({ name: "Seller Vue" });
      }
      else{
        this.$router.push({ name: "Client Vue" });
      }
      console.log(u);
    })
    .catch((err: any) => {
      this.showMessage(`Unable to login ${err}`);
    });
}

showMessage(m: string): void {
  this.message = m;
  setTimeout(() => {    // Auto disappear after 5 seconds
    this.message = "";
  }, 5000);
}

}
</script>

<style scoped >
#AppLogin{
  display: inline-block;
  text-align: right;
  border-radius: 0.5em;
  margin-left:auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: 50em;
}
h1 {
  margin-top: 5em;
  text-align: center;
  color: rgb(0, 0, 0);
  font-family: Arial, Helvetica, sans-serif;
}
</style>