<template>
  <div>
    <app-container>
      <app-sign-in></app-sign-in>
      <app-balance></app-balance>
      <app-send-tokens></app-send-tokens>
      <app-delegations></app-delegations>
    </app-container>
  </div>
</template>

<script>
import AppSignIn from "@/components/AppSignIn.vue";
import AppBalance from "@/components/AppBalance.vue";
import AppContainer from "@/components/AppContainer.vue";
import AppSendTokens from "@/components/AppSendTokens.vue";
import AppDelegations from "@/components/AppDelegations.vue";

export default {
  components: {
    AppSignIn,
    AppBalance,
    AppContainer,
    AppSendTokens,
    AppDelegations,
  },
};
</script>
