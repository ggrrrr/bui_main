<template>
  <v-container>
    <v-card outlined v-for="item in pageItems" :key="item.email">
      <v-card-title class="ml-2"> {{ item.email }}</v-card-title>
      <v-list-item>
        <v-list-item-content>
          <v-container>
            <v-row no-gutters class="pa-2">
              <v-col>Created</v-col>
              <v-col>Namespaces</v-col>
            </v-row>
            <v-row no-gutters class="mt-2">
              <v-col>{{ item.created_time | formatDate }}</v-col>
              <v-col>{{
                !!!item.namespaces ? "none" : formatNamespaces(item.namespaces)
              }}</v-col>
            </v-row>
          </v-container>
        </v-list-item-content>

        <v-list-item-avatar color="grey">
          <v-img :src="item.avatar"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item-subtitle>
        <span class="col-2">{{ formatNamespaces(item.namespaces) }}</span>
      </v-list-item-subtitle>
      <v-list-item-action>
        <v-btn text :disabled="item.enabled" class="ml-2 rounded-l-xl"
          >Activate</v-btn
        >
        <v-btn icon><v-icon src="mdi-delete"></v-icon></v-btn>
      </v-list-item-action>
    </v-card>
  </v-container>
</template>

<script>
import axios from "axios";
// import { mapGetters } from "vuex";
// import moment from "moment";
const TARGET = "users";
export default {
  data() {
    return {
      // setPageItems,
      pageItems: [],
      items1: [],
    };
  },
  computed: {
    // ...mapGetters(["pageItems"]),
    // items: this.pageItems["users"],
  },
  watch: {
    // ...mapGetters(["pageItems"]),
    // items: this.pageItems["users"],
  },
  created() {},
  methods: {
    formatNamespaces: (namespaces) => {
      if (namespaces != null) {
        return namespaces.join(",");
      }
      return "";
    },
    fetchData() {
      console.log("fetchData.mounted base:" + this.$store.getters.baseURL);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      axios
        .get(this.$store.getters.baseURL + "/auth/users/list", {
          headers: headers,
        })
        .then((resp) => {
          let items = [];
          console.log("/auth/users/list", resp.data);
          if (!resp.data.payload) {
            console.log("payload empty");
            return;
          }
          if (resp.data.payload.length) {
            for (let i = 0; i < resp.data.payload.length; i++) {
              let item1 = resp.data.payload[i];
              console.log("/auth/users/list", item1);
              let item = item1;
              item.avatar = item1.attr != null ? item1.attr.picture : "";
              console.log("/auth/users/list", item);
              items[i] = item;
            }
            console.log("/auth/users/list", items);
            this.pageItems = items;
          }
        })
        .catch((e) => {
          this.$store.dispatch("setPageItems", {
            target: TARGET,
            items: [],
          });
          console.log("/auth/request/list errro", e);
          this.$store.dispatch("parseAxiosError", e);
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