<template>
  <div>
    <div class="container">
      <div class="sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="main">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  --sidebar-width: 300px;
}
.sidebar {
  background: #f7f7f7;
  width: var(--sidebar-width);
  height: 100vh;
  position: fixed;
}
.main {
  background: white;
  padding-left: var(--sidebar-width);
  width: 100%;
  height: 100vh;
  display: absolute;
  top: 0;
  box-sizing: border-box;
}
@media screen and (max-width: 600px) {
  .main {
    padding-left: 0;
  }
  .sidebar {
    position: fixed;
    width: 100vw;
    height: 4rem;
    bottom: 0;
    z-index: 1000;
  }
}
</style>

<script>
import AppSidebar from "@/components/AppSidebar.vue";

export default {
  components: {
    AppSidebar,
  },
};
</script>
