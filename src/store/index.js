import Vue from "vue";
import Vuex from "vuex";
// import authStore from "./auth";

Vue.use(Vuex);

const state = {
  config: null,
  allErrors: [],
  pageItems: [],
  message: { type: null, message: null, error: null, icon: null },
  auth: {
    error: { type: null, error: null, message: null },
    token: localStorage.getItem("token"),
    email: localStorage.getItem("email"),
    picture: localStorage.getItem("picture"),
    attrs: null,
    name: null,
  },
};

const getters = {
  errors: (state) => state.allErrors,
  alert: (state) => state.message,
  baseURL: (state) => state.config.BASE_URL,
  auth: (state) => state.auth,
  isLoggedIn(state) {
    return !state.auth.token;
  },
  oauth2: (state) => state.config.oauth2,
  pageItems: (state) => state.pageItems,
};

const actions = {
  setPageItems(store, payload) {
    console.log("SET_PAGE_ITEMS", payload.target, payload.items);
    store.commit("SET_PAGE_ITEMS", payload);
  },
  alertOk(store, message) {
    store.commit("SET_MESSAGE", {
      type: "success",
      error: "success",
      message: message,
    });
  },
  alertHide(store) {
    store.commit("SET_MESSAGE", {
      type: null,
      error: null,
      message: null,
    });
  },
  parseAlert(store, alert) {
    store.commit("SET_MESSAGE", {
      type: alert.type,
      error: alert.error,
      message: alert.message,
    });
  },
  parseAxiosError(store, err) {
    console.log("parseAxiosError:");
    console.log(err);
    if (!err.response) {
      console.log("axios resposne is null: ", err);
      store.commit("SET_MESSAGE", {
        type: "error",
        error: "Please try again later",
        message: err.message,
      });
      return;
    }
    const response = err.response;
    if (!response.data) {
      console.log("axios resposne data is null: ", err);
      store.commit("SET_MESSAGE", {
        type: "error",
        error: "transport",
        message: response,
      });
      return;
    }
    console.log("parseAxiosError:data:", data);
    // console.log(err);

    const data = response.data;
    const httpStatus = response.status;
    let errorType = "error";
    let errorMessage = response;
    let error = "unkown";
    if (data.error) {
      error = data.error;
    }
    if (data.message) {
      errorMessage = data.message;
    }
    if (httpStatus > 499) {
      errorType = "error";
    } else if (httpStatus === 400) {
      errorType = "warning";
    } else if (httpStatus === 401) {
      errorType = "warning";
      store.commit("CLEAR_AUTH");
    } else if (response.status === 404) {
      errorType = "error";
    }
    store.commit("SET_MESSAGE", {
      type: errorType,
      error: error,
      message: errorMessage,
    });
  },
  userLogin(store, payload) {
    console.log("store login ok", payload);
    store.commit("SET_AUTH", payload.payload);
  },
  userLogout(store) {
    console.log("userLogout");
    store.commit("CLEAR_AUTH");
  },
};

const mutations = {
  SET_PAGE_ITEMS(state, peyload) {
    console.log("mutations.pageItems", peyload.target);
    console.log("mutations.pageItems", peyload.items);
    state.pageItems[peyload.target] = peyload.items;
  },
  SET_MESSAGE(state, message) {
    console.log("SET_MESSAGE: ", message);
    message.icon = null;
    if (message.type == "success") {
      message.icon = "mdi-hand-okay";
    }
    if (message.type == "error") {
      message.icon = "mdi-alert-octagon";
    }
    if (message.type == "warning") {
      message.icon = "mdi-alert";
    }
    if (message.type) {
      state.allErrors.push(message);
      console.log(state.allErrors);
    }
    state.message = message;
  },
  SET_BASE_URL(state, payload) {
    state.baseURL = payload.BASE_URL;
    state.config = payload;
  },
  SET_AUTH(state, payload) {
    console.log("save auth", payload);
    state.auth.error = null;
    state.auth.token = payload.token;
    state.auth.email = payload.email;
    state.auth.attr = payload.attr;
    localStorage.setItem("token", payload.token);
    localStorage.setItem("email", payload.email);
    // console.log("attr", payload.attr);
    if (payload.attr.picture) {
      state.auth.picture = payload.attr.picture;
      localStorage.setItem("picture", payload.attr.picture);
    }
  },
  CLEAR_AUTH(state) {
    state.auth.token = null;
    state.auth.email = null;
    state.auth.name = null;
    state.auth.picture = null;
    localStorage.removeItem("email");
    localStorage.removeItem("token");
    localStorage.removeItem("attrs");
    localStorage.removeItem("picture");
  },
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
