<template>
  <v-app>
    <Toolbar />
    <v-main>
      <router-view />
    </v-main>
    <v-footer small padless>
      <!-- <v-card small class="flex" tile width="100%"> -->
      <!-- <v-card-text small tile class="subheading" width="100%"> -->
      <!-- <v-icon color="green" small>mdi-vuejs</v-icon> -->
      <v-row>
        <v-col class="subheading text-left"
          >{{ build_hash }}.{{ build_date }}</v-col
        >
        <!-- <v-col></v-col> -->
        <v-col class="subheading text-right">
          <v-btn
            text
            small
            href="https://vuetifyjs.com"
            class="text-center"
            target="_blank"
            >vuetifyjs</v-btn
          >
          <v-icon color="blue" small>mdi-ampersand</v-icon>
          <!-- <v-icon color="green" small>mdi-vuejs</v-icon> -->
          <!-- <v-icon color="blue" small>mdi-vuetify</v-icon> -->
          <v-btn
            text
            small
            href="https://vuejs.com"
            class="text-center"
            target="_blank"
            >vuejs</v-btn
          >
        </v-col>
      </v-row>
      <!-- </v-row> -->
      <!-- </v-card-text> -->
      <!-- </v-card> -->
    </v-footer>
  </v-app>
</template>

<script>
import Toolbar from "./components/Toolbar.vue";

export default {
  components: { Toolbar },
  name: "App",
  created: () => {
    console.log("App.created");
  },
  started: () => {
    console.log("App.started");
  },
  data: () => ({
    build_hash: process.env.VUE_APP_HASH,
    build_date: process.env.VUE_APP_DATE,
  }),
};
</script>
