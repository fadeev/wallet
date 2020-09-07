<template>
  <div>
    <app-container>
      <app-h2>List of validators</app-h2>
      <app-validators-list />
    </app-container>
  </div>
</template>

<script>
import AppValidatorsList from "@/components/AppValidatorsList.vue";
import AppContainer from "@/components/AppContainer.vue";
import AppH2 from "@/components/AppH2.vue";

export default {
  components: {
    AppValidatorsList,
    AppContainer,
    AppH2,
  },
};
</script>
