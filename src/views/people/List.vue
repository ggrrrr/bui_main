<template>
  <v-container>
    <v-card outlined>
      <v-card-title>
        Poeple
        <v-spacer></v-spacer>
        <v-card-actions>
          <DataRefreshBtnVue
            class="mr-2"
            @click="fetchData"
          ></DataRefreshBtnVue>
          <v-dialog transition="dialog-bottom-transition" max-width="600">
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined rounded color="primary" v-bind="attrs" v-on="on"
                >New</v-btn
              >
              <!-- <DataAddBtnVue v-bind="attrs" v-on="on"></DataAddBtnVue> -->
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-card-title>New</v-card-title>
                <v-card-text>
                  <v-form class="mt-2">
                    <v-text-field
                      v-model="newPerson.full_name"
                      type="text"
                      label="Names"
                      required
                    />
                    <v-text-field
                      v-model="newPerson.email"
                      type="text"
                      label="email"
                    />
                    <v-text-field
                      v-model="newPerson.pin"
                      label="PIN"
                      @click:append="parsePin(newPerson)"
                      @click:append-outer="parseNewPinApply()"
                      :append-outer-icon="pin.ok ? 'mdi-send' : ''"
                      append-icon="mdi-reload"
                      single-line
                    >
                    </v-text-field>
                    <div v-if="pin.ok">
                      <v-row dense>
                        <v-col dense>Birhdate:</v-col>
                        <v-col dense>{{ pin.dob | formatDate }}</v-col>
                      </v-row>
                      <v-row dense>
                        <v-col dense>Gender:</v-col>
                        <v-col dense>{{ pin.gender }}</v-col>
                      </v-row>
                    </div>
                    <v-text-field
                      v-model="newPerson.dob"
                      type="text"
                      label="Birthday"
                    />
                    <v-text-field
                      v-model="newPerson.gender"
                      type="text"
                      label="Gender"
                    />
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn text @click="dialog.value = false">Close</v-btn>
                  <v-btn
                    outlined
                    rounded
                    color="success"
                    @click="
                      insertPerson();
                      dialog.value = false;
                    "
                    >Add</v-btn
                  >
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-card-actions>
      </v-card-title>
      <v-card-title>
        <v-container>
          <v-row mx-auto>
            <v-col class="mx-auto"> other filters </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                outlined
                dense
                hide-details
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-title>
      <v-data-table
        :search="search"
        :headers="headers"
        :items="computedItems"
        multi-sort
        :item-class="dataRowClass"
        class="elevation-1"
      >
        <template v-slot:item.full_name="props">
          <v-edit-dialog
            @save="updateRow(props.item)"
            :return-value.sync="props.item"
          >
            <div v-if="printNames(props.item)">
              {{ printNames(props.item) }}
            </div>
            <DataAddBtnVue v-else></DataAddBtnVue>
            <template v-slot:input>
              <v-row>
                <v-text-field
                  v-model="props.item.full_name"
                  label="Edit"
                  single-line
                >
                </v-text-field>
                <v-text-field
                  v-model="props.item.name"
                  label="Edit"
                  prefix="("
                  suffix=")"
                  single-line
                >
                </v-text-field>
              </v-row>
            </template>
          </v-edit-dialog>
        </template>
        <template v-slot:item.email="props">
          <v-edit-dialog
            @save="updateRow(props.item)"
            :return-value.sync="props.item.email"
          >
            <div v-if="props.item.email">
              {{ props.item.email }}
            </div>
            <DataAddBtnVue v-else></DataAddBtnVue>
            <template v-slot:input>
              <v-text-field v-model="props.item.email" label="Edit" single-line>
              </v-text-field>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.pin="props">
          <v-edit-dialog
            @save="updateRow(props.item)"
            :return-value.sync="props.item.pin"
          >
            <div v-if="props.item.pin">
              {{ props.item.pin }}
            </div>
            <DataAddBtnVue v-else></DataAddBtnVue>
            <template v-slot:input>
              <v-text-field
                v-model="props.item.pin"
                label="Edit"
                @click:append="parsePin(props.item)"
                @click:append-outer="parsePinApply(props.item)"
                :append-outer-icon="pin.ok ? 'mdi-send' : ''"
                append-icon="mdi-reload"
                single-line
              >
              </v-text-field>
              <div v-if="pin.ok">
                <v-row dense>
                  <v-col dense>Birhdate:</v-col>
                  <v-col dense>{{ pin.dob | formatDate }}</v-col>
                </v-row>
                <v-row dense>
                  <v-col dense>Gender:</v-col>
                  <v-col dense>{{ pin.gender }}</v-col>
                </v-row>
              </div>
              <!-- <v-btn @click="parsePin(props.item)">asd</v-btn> -->
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.labels="props">
          <v-edit-dialog :return-value.sync="props.item.labels">
            <v-chip
              small
              outlined
              class="ma-1"
              :key="k"
              v-for="k in props.item.labels"
            >
              {{ k }}
            </v-chip>
            <template v-slot:input>
              <v-list dense rounded>
                <v-list-item plain>
                  <v-list-item-content plain>
                    <v-text-field v-model="newLabel" label="Add" single-line>
                    </v-text-field>
                  </v-list-item-content>
                  <v-list-item-action>
                    <DataAddBtnVue
                      @click="addLabel(props.item, newLabel)"
                    ></DataAddBtnVue
                  ></v-list-item-action>
                </v-list-item>
                <v-list-item dense :key="k" v-for="k in props.item.labels">
                  <v-list-item-content plain>
                    <div>
                      <v-chip outlined class="ma-1">
                        {{ k }}
                      </v-chip>
                    </div>
                  </v-list-item-content>
                  <v-list-item-action>
                    <DataDelBtnVue
                      @click="removeLabel(props.item, k)"
                    ></DataDelBtnVue
                  ></v-list-item-action>
                </v-list-item>
              </v-list>
            </template>
          </v-edit-dialog>
        </template>

        <template v-slot:item.dob="{ item }">
          {{ item.dob | formatDate }}
        </template>

        <template v-slot:item.phones="{ item }">
          <span dense :key="i" dark v-for="(v, i) in item.phones">
            {{ i }}:{{ v }}
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-icon
            :disabled="!!!item.updated"
            class="mr-2"
            @click="updatePerson(item)"
          >
            mdi-upload
          </v-icon>
          <v-icon @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import DataAddBtnVue from "../../components/base/DataAddBtn.vue";
import DataDelBtnVue from "../../components/base/DataDelBtn.vue";
import DataRefreshBtnVue from "../../components/base/DataRefreshBtn.vue";
// import NewPersonVue from "../../components/people/NewPerson.vue";

import axios from "axios";
export default {
  components: {
    DataAddBtnVue,
    DataDelBtnVue,
    DataRefreshBtnVue,
    // NewPersonVue,
  },
  computed: {
    computedItems() {
      return this.people;
    },
  },
  data() {
    return {
      pin: {
        dob: null,
        ok: false,
        gender: "",
      },
      newPerson: {
        pin: "",
        full_name: "",
        gender: "",
        dob: "",
      },
      newLabel: "",
      search: "",
      headers: [
        {
          text: "Names",
          align: "start",
          sortable: true,
          value: "full_name",
        },
        { text: "Email", value: "email", sortable: true },
        { text: "Labels", value: "labels" },
        { text: "Phones", value: "phones" },
        { text: "PIN", value: "pin" },
        { text: "Date of birth", value: "dob" },
        { text: "Age", value: "age" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      people: [],
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    dataRowClass(item) {
      if (item.updated) {
        return "updated";
      }
    },
    removeLabel(item, val) {
      console.log("removeLabel:", item, val);
      for (var i = 0; i < item.labels.length; i++) {
        if (item.labels[i] === val) {
          item.labels.splice(i, 1);
          item.updated = true;
        }
      }
      console.log("removeLabel:", item.labels, val);
    },
    addLabel(item, val) {
      console.log("addLabel:", item, val);
      for (var i = 0; i < item.labels.length; i++) {
        if (item.labels[i] === val) {
          return;
        }
      }
      item.updated = true;
      item.labels.push(val);
      console.log("addLabel:", item.labels, val);
    },
    printNames(item) {
      let out = "";
      if (item.name) {
        out = " ( " + item.name + " )";
      }
      return item.full_name + out;
    },
    updateRow(item) {
      item.updated = true;
      console.log("updateRow", item);
    },
    parsePinApply(item) {
      item.pin = this.pin.egn;
      item.dob = this.pin.dob;
      item.gender = this.pin.gender;
      item.updated = true;
    },
    parseNewPinApply() {
      // item.pin = this.pin.egn;
      // item.dob = this.pin.dob;
      this.newPerson.gender = this.pin.gender;
      this.newPerson.dob = this.pin.dob;
      // item.updated = true;
    },
    parsePin(item) {
      const updateData = {
        pin: item.pin,
      };
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };

      axios
        .post(this.$store.getters.baseURL + "/people/pin/parse", updateData, {
          headers: headers,
        })
        .then((resp) => {
          console.log("/people/pin/parse", resp);
          item.updated = false;
          if (resp.data) {
            this.pin = resp.data.payload;
          }
        })
        .catch((e) => {
          this.$store.dispatch("parseAxiosError", e);
        })
        .finally();
    },
    updatePerson(item) {
      console.log("updatePerson", item);
      console.log("fetchData:" + this.$store.getters.baseURL);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      const updateData = {
        id: item.id,
      };
      if (item.full_name) {
        updateData.full_name = item.full_name;
      }
      if (item.name) {
        updateData.name = item.name;
      }
      if (item.dob) {
        updateData.dob = item.dob;
      }
      if (item.email) {
        updateData.email = item.email;
      }
      if (item.pin) {
        updateData.pin = item.pin;
      }
      if (item.labels) {
        updateData.labels = item.labels;
      }
      axios
        .post(
          this.$store.getters.baseURL + "/people/person/update",
          updateData,
          {
            headers: headers,
          }
        )
        .then((resp) => {
          console.log("/people/", resp);
          this.$store.dispatch("alertOk", "person added");
          item.updated = false;
        })
        .catch((e) => {
          this.$store.dispatch("parseAxiosError", e);
        })
        .finally();
    },

    insertPerson() {
      const item = this.newPerson;
      console.log("insertPerson:" + this.newPerson);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      const updateData = {
        full_name: item.full_name,
      };
      if (item.dob) {
        updateData.dob = item.dob;
      }
      if (item.email) {
        updateData.email = item.email;
      }
      if (item.pin) {
        updateData.pin = item.pin;
      }
      if (item.gender) {
        updateData.gender = item.gender;
      }
      if (item.labels) {
        updateData.labels = item.labels;
      }
      console.log("insertPerson", updateData);
      axios
        .post(
          this.$store.getters.baseURL + "/people/person/insert",
          updateData,
          {
            headers: headers,
          }
        )
        .then((resp) => {
          console.log("/people/person/insert", resp);
          this.$store.dispatch("alertOk", "person added");
          item.updated = false;
        })
        .catch((e) => {
          this.$store.dispatch("parseAxiosError", e);
        })
        .finally();
    },

    fetchData() {
      console.log("fetchData:" + this.$store.getters.baseURL);
      const headers = {
        Authorization: "Bearer " + this.$store.getters.auth.token,
      };
      axios
        .get(this.$store.getters.baseURL + "/people/list", {
          headers: headers,
        })
        .then((resp) => {
          let items = [];
          console.log("/people/list", resp.data);
          if (!resp.data.payload) {
            console.log("payload empty");
            return;
          }
          if (resp.data.payload.length) {
            for (let i = 0; i < resp.data.payload.length; i++) {
              let item1 = resp.data.payload[i];
              console.log("/people/list", item1);
              let item = item1;
              item.avatar = item1.attr != null ? item1.attr.picture : "";
              item.updated = false;
              console.log("/auth/users/list", item);
              items[i] = item;
            }
            console.log("/auth/users/list", items);
            this.people = items;
          }
        })
        .catch((e) => {
          this.$store.dispatch("parseAxiosError", e);
        })
        .finally();
    },
  },
};
</script>


<style>
.updated td {
  background: rgb(0, 217, 255);
}
</style>