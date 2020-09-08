<template>
  <div>
    <div class="container">
      <app-h2>Your stake</app-h2>
      <div class="item" v-for="d in delegationsList">
        <div class="item__icon">
          <app-avatar :seed="d.operator_address" />
        </div>
        <div class="item__title">
          <div class="item__title__h2">
            {{ d.validator.description.moniker }}
          </div>
          <div>
            {{ formatNumber(d.balance) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 4rem;
}
.item {
  display: flex;
  align-items: stretch;
  padding: 1rem 0;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
}
.item__icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  filter: grayscale(100%) brightness(400%) contrast(50%);
}
.item__title {
  padding: 0 1rem;
}
.item__title__h2 {
  font-weight: 500;
  margin-bottom: 0.25rem;
  color: rgba(0, 0, 0, 0.5);
}
</style>

<script>
import AppH2 from "@/components/AppH2.vue";
import AppAvatar from "@/components/AppAvatar.vue";
import { find } from "lodash";

export default {
  components: {
    AppH2,
    AppAvatar,
  },
  computed: {
    delegationsList() {
      return this.delegations.map((d) => {
        const query = ["operator_address", d.validator_address];
        const validator = find(this.validators, query);
        return { ...d, validator };
      });
    },
    delegations() {
      return this.$store.state.cosmos.delegations;
    },
    validators() {
      return this.$store.state.cosmos.validators;
    },
  },
  methods: {
    formatNumber(number) {
      return Intl.NumberFormat().format(+number);
    },
  },
};
</script>
