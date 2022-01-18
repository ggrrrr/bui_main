<template>
  <div class="text-center">
    <v-menu offset-y dense>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text class="rounded-r-xl" outlined v-bind="attrs" v-on="on"
          ><span>{{ loginName }} </span>
          <v-avatar size="36px" class="ml-2">
            <v-img v-if="picture" :src="picture"></v-img>
            <v-icon v-else>mdi-account</v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item link to="/me/password">
          <v-list-item-icon>
            <v-icon>mdi-account-lock</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Security </v-list-item-title>
        </v-list-item>
        <v-list-item link @click="showAlert">
          <v-list-item-icon>
            <v-icon>mdi-format-list-checks</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Todo ... </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-snackbar v-model="snackbar" top shaped timeout="4000"
      >not done</v-snackbar
    >
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  data: () => ({
    snackbar: false,
    // logginName: "asd",
    propfileLinks: [{ title: "Shit 1" }, { title: "Shit 2" }],
  }),
  methods: {
    showAlert() {
      console.log("asdasdasd");
      // this.$store.dispatch("alertOk", "asdasd");
      this.$store.dispatch("alertOk", "asdasdasd");
    },
  },
  computed: {
    ...mapGetters(["auth", "alert"]),
    picture() {
      if (!this.auth.picture) {
        return null;
      }
      return this.auth.picture;
    },
    loginName() {
      return this.auth.email;
    },
  },
  created() {
    console.log("LoginInfo.created");
    console.log("LoginInfo:header", this.$router);
  },
  mounted() {
    console.log("LoginInfo.mounted base:" + this.$store.getters.baseURL);
    const headers = {
      Authorization: "Bearer " + this.$store.getters.auth.token,
    };
    axios
      .get(this.$store.getters.baseURL + "/auth/token", { headers: headers })
      .then((resp) => {
        console.log("/auth/token", resp.status);
      })
      .catch((e) => {
        this.$store.dispatch("parseAxiosError", e);
        if (e.response) {
          console.log("LoginInfo.created", e.response.data);
        } else {
          this.overlay = false;
        }
        this.$router.push("/login");
      })
      .finally();
  },
};
</script>

<style>
</style>