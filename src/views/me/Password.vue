<template>
  <v-container fluid class="kur">
    <v-overlay name="progress" :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="align-end">
      <v-col>
        <v-card width="400" class="mx-auto mt-1">
          <v-card-title>
            <v-avatar class="mr-10">
              <v-img v-if="picture" :src="picture"></v-img>
              <v-icon v-else>mdi-account</v-icon>
            </v-avatar>
            <span> {{ auth.email }}</span>
          </v-card-title>
          <v-card-text>
            <v-form class="mt-2" v-model="isValid" ref="my">
              <input
                autocomplete="username"
                type="hidden"
                name="email"
                :value="auth.email"
              />
              <v-text-field
                autocomplete="current-password"
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Current password"
                prepend-icon="mdi-lock"
                :append-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                required
              />
              <v-divider class="mt-2 mb-2"></v-divider>
              <v-text-field
                autocomplete="new-password"
                v-model="newPassword"
                :rules="newPasswordRules"
                :type="showNewPassword ? 'text' : 'password'"
                label="New password"
                prepend-icon="mdi-lock"
                :append-icon="!showNewPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showNewPassword = !showNewPassword"
                required
              />
              <v-text-field
                autocomplete="new-password"
                v-model="rePassword"
                :rules="rePasswordRules"
                :type="showRePassword ? 'text' : 'password'"
                label="New password"
                prepend-icon="mdi-lock"
                :append-icon="!showRePassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showRePassword = !showRePassword"
                required
              />
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              block
              color="success"
              @click="userLogin"
              :disabled="!isValid"
              class="mt-1"
              >Submit</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <div>asdasd {{ alert }}</div>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      showPassword: false,
      showNewPassword: false,
      showRePassword: false,
      alertType: "warning",
      errors: null,
      overlay: false,
      isValid: false,
      password: null,
      newPassword: null,
      rePassword: null,
      email: null,
      passwordRules: [(v) => !!v || "current is required"],
      newPasswordRules: [(v) => !!v || "new password is required"],
      rePasswordRules: [
        (v) => !!v || "re enter password is required",
        (v) => v != this.new_password || "password must match",
      ],
    };
  },
  mounted() {},
  computed: {
    ...mapGetters(["auth", "alert"]),
    picture() {
      if (!this.$store.getters.auth.picture) {
        return null;
      }
      return this.$store.getters.auth.picture;
    },
  },
  methods: {
    userLogin() {
      this.overlay = true;
      const payload = {
        email: this.email,
        password: this.password,
        new_password: this.newPassword,
      };
      console.log("baseURL:" + this.$store.getters.baseURL);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      axios
        .post(this.$store.getters.baseURL + "/auth/me/password", payload, {
          headers: headers,
        })
        .then((resp) => {
          this.overlay = false;
          console.log("responseOK: ", resp);
          this.$store.dispatch("alertOk", "password changed");
          this.$refs.my.reset();
        })
        .catch((e) => {
          this.overlay = false;
          this.$store.dispatch("parseAxiosError", e);
          this.$refs.my.reset();
        })
        .finally();
    },
  },
};
</script>

<style>
</style>