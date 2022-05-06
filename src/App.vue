<template>
  <Navbar />
  <router-view></router-view>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import store from "./store";

export default {
  components: { Navbar },
  setup() {
    console.log(store.state);
    return {};
  },
};
</script>

<style></style>
