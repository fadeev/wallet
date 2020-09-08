<template>
  <div>
    <div class="container" v-if="validators">
      <div class="wrapper">
        <router-link
          tag="div"
          :to="`/validators/${v.operator_address}`"
          class="item"
          v-for="v in validators"
          :key="v.operator_address"
        >
          <div class="item__icon">
            <app-avatar :seed="v.operator_address" />
          </div>
          <div class="item__title">
            <div class="item__title__h2">
              {{ v.description.moniker }}
            </div>
            <div class="item__title__h3">{{ v.voting_power }}%</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-top: 3rem;
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1);
  padding-top: 0.25rem;
}
.item {
  padding: 1rem 0;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  cursor: pointer;
}
.item:hover .item__icon {
  filter: none;
}
.item__icon {
  transition: filter 0.1s;
  width: 3rem;
  height: 3rem;
  filter: grayscale(100%);
}
.item__title {
  margin: 0 1rem;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.75);
}
.item__title__h2 {
  margin-bottom: 0.25rem;
}
.item__title__h3 {
  color: rgba(0, 0, 0, 0.5);
}
</style>

<script>
import AppAvatar from "@/components/AppAvatar.vue";
import { orderBy } from "lodash";

export default {
  components: {
    AppAvatar,
  },
  computed: {
    validators() {
      const pool = this.stakingPool.bonded_tokens;
      let validators = this.$store.state.cosmos.validators;
      validators = validators.map((v) => {
        const voting_power = ((v.tokens * 100) / pool).toFixed(2);
        return { ...v, voting_power };
      });
      validators = orderBy(validators, ["voting_power"], ["desc"]);
      return validators;
    },
    stakingPool() {
      return this.$store.state.cosmos.stakingPool;
    },
  },
};
</script>
