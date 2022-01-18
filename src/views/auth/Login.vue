<template>
  <v-container fluid class="kur">
    <v-overlay name="progress" :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="align-end">
      <v-col>
        <v-card width="400" class="mx-auto mt-1">
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <v-btn block @click.prevent="oauthLogin('google')">
              <GoogleIconVue></GoogleIconVue>
              <span class="ml-5">Google</span>
            </v-btn>
          </v-card-text>
          <v-card-text>
            <v-btn block @click.prevent="oauthLogin('facebook')">
              <FacebookIconVue></FacebookIconVue>
              <span class="ml-5">Facebook</span>
            </v-btn>
          </v-card-text>
          <div class="separator">or</div>
          <v-card-text>
            <v-form class="mt-2" v-model="isValid">
              <v-text-field
                autocomplete="username"
                v-model="email"
                ref="emailInput"
                :rules="emailRules"
                type="text"
                label="E-mail"
                prepend-icon="mdi-account-circle"
                required
              />
              <v-text-field
                autocomplete="current-password"
                v-model="password"
                :rules="passwordRules"
                :type="showPassword ? 'text' : 'password'"
                label="Password"
                prepend-icon="mdi-lock"
                :append-icon="!showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                @click:append="showPassword = !showPassword"
                required
                v-on:keyup.enter="userLogin"
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
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import GoogleIconVue from "../../components/auth/GoogleIcon.vue";
import FacebookIconVue from "../../components/auth/FacebookIcon.vue";
// import AlertBarVue from "../../components/base/AlertBar.vue";
export default {
  components: {
    GoogleIconVue,
    // AlertBarVue,
    FacebookIconVue,
  },
  data() {
    return {
      showPassword: false,
      alertType: "warning",
      errors: null,
      overlay: false,
      isValid: false,
      password: null,
      email: null,
      emailRules: [(v) => !!v || "Email is required"],
      passwordRules: [(v) => !!v || "Email is required"],
    };
  },
  mounted() {
    console.log("login asdasd asd asd asd asd asd mounted");
  },
  computed: {
    ...mapGetters(["auth"]),
  },
  methods: {
    oauthLogin(provider) {
      if (!(provider in this.$store.getters.oauth2)) {
        this.$store.dispatch("setError", {
          error: {
            message: "Missing " + provider + " in config",
          },
        });
        return;
      }
      const oauth2Cfg = this.$store.getters.oauth2[provider];
      console.log("oauth2Cfg", oauth2Cfg);
      var form = document.createElement("form");
      form.setAttribute("method", "GET");
      form.setAttribute("action", oauth2Cfg.oauth2_endpoint);

      var params = {
        client_id: oauth2Cfg.client_id,
        redirect_uri: oauth2Cfg.redirect_uri,
        response_type: oauth2Cfg.response_type,
        scope: oauth2Cfg.scope,
        include_granted_scopes: oauth2Cfg.include_granted_scopes,
        state: provider + "-" + "ADS123easdasd",
      };

      for (var p in params) {
        var input = document.createElement("input");
        input.setAttribute("type", "hidden");
        input.setAttribute("name", p);
        input.setAttribute("value", params[p]);
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    },
    userLogin() {
      this.overlay = true;
      const payload = {
        email: this.email,
        password: this.password,
      };
      console.log("base:" + this.$store.getters.baseURL);
      axios
        .post(this.$store.getters.baseURL + "/auth/login/user", payload)
        .then((resp) => {
          this.overlay = false;
          this.$store.dispatch("userLogin", resp.data);
          this.$store.dispatch("alertOk", "Logged");
          this.$router.push("/");
        })
        .catch((e) => {
          this.overlay = false;
          this.$store.dispatch("parseAxiosError", e);
          this.$store.dispatch("userLogout");
        })
        .finally();
    },
  },
};
</script>

<style scoped>
.kur1 {
  background: url("../../assets/beers.png");
  background-size: 40;
  height: 100;
}
.separator {
  display: flex;
  align-items: center;
  text-align: center;
}

.separator::before,
.separator::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #eeeeee;
}

.separator:not(:empty)::before {
  margin-right: 0.25em;
}

.separator:not(:empty)::after {
  margin-left: 0.25em;
}
</style>