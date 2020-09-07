<template>
  <div>
    <app-layout>
      <router-view />
    </app-layout>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap");

body {
  margin: 0;
  font-family: "Inter", Helvetica, Arial, sans-serif;
}
</style>

<style scoped>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<script>
import AppLayout from "@/components/AppLayout.vue";

export default {
  components: {
    AppLayout,
  },
  created() {
    this.$store.dispatch("init");
  },
};
</script>
