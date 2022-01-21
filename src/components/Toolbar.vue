<template>
  <div>
    <v-app-bar app dense flat elevation="2" color="grey lighten-2">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <AlertBarVue></AlertBarVue>

      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-btn text to="/"><span>Home</span></v-btn>

      <v-spacer></v-spacer>
      <v-btn v-if="isLoggedIn" plain to="/login">
        <span class="mr-1">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>

      <LoginInfo v-if="!isLoggedIn" />
      <v-btn
        text
        v-if="!isLoggedIn"
        outlined
        class="ml-2 rounded-l-xl"
        @click="logout()"
      >
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute clipped left>
      <v-list subheader>
        <v-subheader inset>Folders</v-subheader>
        <v-list-item to="/calendar">
          <v-list-item-action><v-icon>mdi-calendar</v-icon></v-list-item-action>
          <v-list-item-title>calendar</v-list-item-title>
        </v-list-item>

        <v-subheader inset>Admin</v-subheader>
        <v-list-item to="/auth/requests">
          <v-list-item-action
            ><v-icon>mdi-account-alert</v-icon></v-list-item-action
          >
          <v-list-item-title>AuthRequests</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginInfo from "./LoginInfo.vue";
import AlertBarVue from "./base/AlertBarSnackbar.vue";

export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {
    LoginInfo,
    AlertBarVue,
  },
  methods: {
    logout() {
      this.$store.dispatch("userLogout");
      if (this.$route.name !== "Home") {
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
  },
};
</script>

<style>
</style>