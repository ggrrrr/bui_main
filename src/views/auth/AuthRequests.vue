<template>
  <v-container flex class="mx-auto">
    <v-list three-line>
      <v-subheader>Login requests</v-subheader>
      <template v-for="item in pageItems.USER_REQUESTS">
        <v-list-item :key="item.email">
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.names"></v-list-item-title>
            <v-list-item-subtitle>
              <span class="text--primary">{{ item.email }}</span> &mdash;{{
                item.provider
              }}
              &mdash;
              {{ item.created | formatDate }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action
            ><v-btn text outlined @click="activateRequestCall(item.email)"
              >Activate</v-btn
            ></v-list-item-action
          >
        </v-list-item>
        <v-divider :key="item.email" inset></v-divider>
      </template>
    </v-list>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import moment from "moment";
const TARGET = "USER_REQUESTS";
export default {
  data() {
    return {
      items1: [],
      items: [
        { header: "Today" },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
          title: "Brunch this weekend?",
          names: "Brunch this weekend",
          subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          names: "Brunch this weekend",
          subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
          title: "Oui oui",
          names: "Brunch this weekend",
          subtitle:
            '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        { divider: true, inset: true },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
          title: "Birthday gift",
          names: "Brunch this weekend",
          subtitle:
            '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
          title: "Recipe to try",
          names: "Brunch this weekend",
          subtitle:
            '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["pageItems"]),
    items3: () => {
      return this.pageItems;
    },
  },
  created() {
    this.fetchData();
  },
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
          console.log("/auth/request/list", resp.data);
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
            this.$store.dispatch("setPageItems", {
              target: TARGET,
              items: items,
            });
          }
        })
        .catch((e) => {
          // this.overlay = false;
          this.$store.dispatch("setPageItems", {
            target: TARGET,
            items: [],
          });
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