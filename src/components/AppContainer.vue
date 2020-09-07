<template>
  <div>
    <div class="container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1000px;
  padding-left: 2rem;
  padding-right: 2rem;
  box-sizing: border-box;
  margin-left: auto;
  margin-right: auto;
  padding-top: 4rem;
  padding-bottom: 4rem;
}
</style>
