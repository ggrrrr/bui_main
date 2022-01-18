<template>
  <v-snackbar v-model="showAlert" absolute :color="alert.type" shaped top>
    <v-row>
      <v-col class="col-1">
        <v-icon class="">{{ alert.icon }}</v-icon>
      </v-col>
      <v-col class="col-6 ml-4">
        <div class="font-weight-medium">
          {{ alert.message }}
        </div>
        <div class="font-weight-light">{{ alert.error }}</div>
      </v-col>
    </v-row>
  </v-snackbar>
</template>

    <script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      timeout: 3000,
      absolute: true,
      overlay: false,
    };
  },
  methods: {
    close() {
      this.$store.dispatch("alertHide");
    },
    start(timeout) {
      console.log("start");
      if (timeout > 0) {
        setTimeout(() => {
          console.log("closeing.");
          this.$store.dispatch("alertHide");
        }, timeout);
      }
    },
  },
  computed: {
    ...mapGetters(["auth", "alert"]),
    showAlert() {
      // startTiomer();
      if (this.alert.type) {
        // this.countDown = 2;
        if (this.alert.type == "warning") {
          this.start(this.timeout);
        }
        if (this.alert.type == "success") {
          this.start(this.timeout);
        }
        this.start(3000);
        return true;
      }
      return false;
    },
  },
};
</script>

<style>
</style>