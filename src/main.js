import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "axios";

Vue.config.productionTip = false;

axios
  .get("/json/config.json")
  .then((response) => {
    console.log("readConfig:BASE_URL:" + response.data.BASE_URL);
    store.commit("SET_BASE_URL", response.data);
    console.log("main loadConfig.done.");

    new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  })
  .catch((e) => {
    console.log("readConfig:" + e);
    store.state.baseURL = null;
  });
// store.state.baseURL = "asdasd"
// store.commit('CLEAR_AUTH')
