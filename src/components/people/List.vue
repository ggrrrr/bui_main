<template>
  <v-container>
    <v-card outlined>
      <v-card-title>
        Poeple
        <v-spacer></v-spacer>
        <v-card-actions>
          <DataRefreshBtnVue
            class="mr-2"
            @click="asyncFetchData"
          ></DataRefreshBtnVue>
          <NewPersonVue></NewPersonVue>
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
// import DataAddBtnVue from "../../components/base/DataAddBtn.vue";
// import DataDelBtnVue from "../../components/base/DataDelBtn.vue";
import DataRefreshBtnVue from "../../components/base/DataRefreshBtn.vue";
import NewPersonVue from "../../components/people/NewPerson.vue";

// import axios from "axios";
export default {
  components: {
    // DataAddBtnVue,
    // DataDelBtnVue,
    DataRefreshBtnVue,
    NewPersonVue,
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
      newPersonfull_name: "",
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
    this.asyncFetchData();
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

    updatePerson(item) {
      console.log("updatePerson", item);
    },

    insertPerson() {
      // const item = this.newPerson;
      console.log("insertPerson:" + this.newPerson);
    },

    asyncFetchData() {
      console.log("fetchData:" + this.$store.getters.baseURL);
      this.people.push({
        full_name: "meee",
        pin: "a123123123123",
        labels: ["123:!23", "asd:123"],
      });
      this.people.push({
        full_name: "muuuu",
        pin: "2345345345",
        labels: ["asd:!23"],
      });
    },
  },
};
</script>


<style>
.updated td {
  background: rgb(0, 217, 255);
}
</style>