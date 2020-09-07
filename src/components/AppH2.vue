<template>
  <div>
    <div class="app__h2">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.app__h2 {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
  color: rgba(0, 0, 0, 0.5);
}
</style>
