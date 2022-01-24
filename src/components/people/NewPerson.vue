<template>
  <v-dialog transition="dialog-bottom-transition" max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn text outlined color="primary" v-bind="attrs" v-on="on">ADD</v-btn>
      <!-- <DataAddBtnVue v-bind="attrs" v-on="on"></DataAddBtnVue> -->
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar color="primary" dark>New</v-toolbar>
        <v-card-text>
          <v-form class="mt-2">
            <v-text-field
              v-model="full_name"
              type="text"
              label="Names"
              required
            />
            <v-text-field v-bind="email" type="text" label="email" />
            <v-text-field
              v-model="pin"
              label="PIN"
              append-icon="mdi-reload"
              single-line
            >
            </v-text-field>
            <v-text-field v-model="dob" type="text" label="Birthday" />
            <v-text-field v-model="gender" type="text" label="Gender" />
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-row>
            <v-col vols="2">
              <v-btn block @click="dialog.value = false">Close</v-btn>
            </v-col>
            <v-col>
              <v-spacer></v-spacer>
            </v-col>

            <v-col vols="2">
              <v-btn block color="success" @click="handleSave()">save</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      egn: {
        ok: false,
        gender: null,
        dob: null,
      },
      pin: null,
      full_name: null,
      email: null,
      gender: null,
      dob: null,
    };
  },
  methods: {
    handleSave() {
      console.log("handleSave", this.full_name);
      console.log("handleSave", this);
    },
  },
  components: {},
};
</script>

<style>
</style>