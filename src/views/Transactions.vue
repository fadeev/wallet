<template>
  <div>
    <app-container>
      <app-h2>Transactions</app-h2>
      <app-transaction-list />
    </app-container>
  </div>
</template>

<script>
import AppTransactionList from "@/components/AppTransactionList.vue";
import AppContainer from "@/components/AppContainer.vue";
import AppH2 from "@/components/AppH2.vue";

export default {
  components: {
    AppTransactionList,
    AppContainer,
    AppH2,
  },
};
</script>
