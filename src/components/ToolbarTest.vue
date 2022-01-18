<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({
    toolbarLogo: require("../assets/logo.svg"),
    drawer: false,
    // group: null,
  }),
  watch: {
    group() {
      this.drawer = false;
    },
  },
  components: {},
  methods: {},
  computed: {},
};
</script>

<style scoped>
</style>