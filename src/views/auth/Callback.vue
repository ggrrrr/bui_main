<template>
  <v-card loading elevation="2">
    <v-card-title>Callback</v-card-title>
    <v-card-subtitle>Please wait...</v-card-subtitle>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    props: null,
    code: null,
    state: null,
  }),
  mounted() {
    let code = this.$route.query.code;
    let state = this.$route.query.state;
    let stateProvider = state.split("-");
    let oauth2Cfg = this.$store.getters.oauth2[stateProvider[0]];

    console.log("this.$route.query.state", state);
    console.log("this.$route.query.code", code);
    console.log("this.$route.query.code", stateProvider);
    console.log("baseURL", this.$store.getters.baseURL);
    axios
      .post(this.$store.getters.baseURL + "/auth/login/oauth2", {
        state: stateProvider[1],
        code: code,
        provider: stateProvider[0],
        redirect_url: oauth2Cfg.redirect_uri,
      })
      .then((r) => {
        this.$store.dispatch("userLogin", r.data);
        this.$store.dispatch("alertOk", "Logged");
        this.$router.push("/");
      })
      .catch((e) => {
        console.log("error: ", e);
        this.overlay = false;
        this.$store.dispatch("parseAxiosError", e);
        this.$router.push("/login");
      });
  },
};
</script>

<style>
</style>