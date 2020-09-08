<template>
  <div>
    <div class="container">
      <app-h2>Balance</app-h2>
      <div class="item" v-if="account" v-for="balance in account.coins">
        {{ formatNumber(balance.amount) }}
        {{ balance.denom }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 4rem;
}
.item {
  background: rgba(0, 0, 0, 0.03);
  padding: 0.75rem;
  border-radius: 0.25rem;
}
</style>

<script>
import AppH2 from "@/components/AppH2.vue";

export default {
  components: {
    AppH2,
  },
  computed: {
    account() {
      return this.$store.state.cosmos.account;
    },
  },
  methods: {
    formatNumber(number) {
      return Intl.NumberFormat().format(+number);
    },
  },
};
</script>
