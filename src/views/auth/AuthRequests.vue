<template>
  <v-container class="col-6">
    <v-card>
      <v-card-title>Registration requests</v-card-title>
      <v-list three-line>
        <v-list-item v-for="item in pageItems" :key="item.email">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="item.names"></v-list-item-title>

            <v-list-item-subtitle>
              <v-row>
                <v-col class="col-3">{{ item.email }}</v-col>
                <v-col class="col-2">{{ item.provider }}</v-col>
                <v-col class="d-flex flex-nowrap">{{
                  item.created | formatDate
                }}</v-col>
              </v-row>
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon>
              <v-icon
                @click="activateRequestCall(item.email)"
                title="asd"
                color="grey lighten-1"
                >mdi-lock-plus</v-icon
              >
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import moment from "moment";

export default {
  data() {
    return {
      items1: [],
    };
  },
  computed: {
    ...mapGetters(["pageItems"]),
  },
  created() {},
  methods: {
    activateRequestCall(email) {
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      this.overlay = true;
      const payload = {
        email: email,
      };
      console.log("base:" + this.$store.getters.baseURL);
      axios
        .post(this.$store.getters.baseURL + "/auth/request/activate", payload, {
          headers: headers,
        })
        .then((resp) => {
          this.overlay = false;
          console.log("res: ", resp);
          this.$store.dispatch("alertOk", "Activated");
          this.fetchData();
        })
        .catch((e) => {
          this.overlay = false;
          this.$store.dispatch("parseAxiosError", e);
          // this.$store.dispatch("userLogout");
        })
        .finally();
    },
    fetchData() {
      console.log("fetchData.mounted base:" + this.$store.getters.baseURL);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      axios
        .get(this.$store.getters.baseURL + "/auth/request/list", {
          headers: headers,
        })
        .then((resp) => {
          let items = [];
          console.log("/auth/request/list", resp.data.payload);
          if (!resp.data.payload) {
            console.log("payload empty");
            return;
          }
          if (resp.data.payload.length) {
            for (let i = 0; i < resp.data.payload.length; i++) {
              let item1 = resp.data.payload[i];
              console.log("/auth/request/list", item1);
              let pic = item1.attr.picture;
              let names = item1.attr.name;
              let created = new Date(`${item1.created_time}`);
              // let created = moment(String(item1.created_time)).format(
              // "MM/DD/YYYY hh:mm"
              // );
              let item = {
                email: item1.email,
                avatar: pic,
                names: names,
                provider: item1.attr.provider,
                created: created,
              };
              console.log("/auth/request/list", item);
              // this.items[i] = item;
              items[i] = item;
            }
            console.log("/auth/request/list", items);
            // this.items;
            this.$store.dispatch("setPageItems", items);
          }
        })
        .catch((e) => {
          // this.overlay = false;
          this.$store.dispatch("setPageItems", []);
          console.log("/auth/request/list errro", e);
          this.$store.dispatch("parseAxiosError", e);
          // if (e.response) {
          //   // console.log("LoginInfo.created", e.response.data);
          // } else {
          // }
          // this.$router.push("/login");
        })
        .finally();
    },
  },
  beforeMount() {
    // this.fetchData();
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style>
</style>