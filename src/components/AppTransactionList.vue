<template>
  <div>
    <div class="container">
      <div class="item" v-for="t in transfers">
        <div :class="['item__icon', `item__icon__type__${typeUpDown(t.type)}`]">
          <component :is="`icon-arrow-${typeUpDown(t.type)}`" />
        </div>
        <div class="item__title">
          <span v-for="a in amounts(t)"> {{ a.amount }} {{ a.denom }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.1);
}
.item {
  padding: 1rem 0;
  box-shadow: inset 0 -1px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}
.item__icon {
  width: 1.15rem;
  height: 1.15rem;
}
.item__title {
  margin: 0 1rem;
}
.item__icon__type__up {
  stroke: rgb(0, 47, 201);
}
.item__icon__type__down {
  stroke: rgb(0, 117, 0);
}
</style>

<script>
import axios from "axios";
import { orderBy } from "lodash";
import IconArrowUp from "@/components/IconArrowUp.vue";
import IconArrowDown from "@/components/IconArrowDown.vue";

export default {
  components: {
    IconArrowUp,
    IconArrowDown,
  },
  computed: {
    transfers() {
      let incoming = this.$store.state.cosmos.transfersIncoming;
      let outgoing = this.$store.state.cosmos.transfersOutgoing;
      incoming = incoming.map((i) => ({ ...i, type: "incoming" }));
      outgoing = outgoing.map((i) => ({ ...i, type: "outgoing" }));
      let transfers = [...incoming, ...outgoing];
      return orderBy(transfers, ["height"], ["desc"]);
    },
  },
  methods: {
    typeUpDown(type) {
      return type === "incoming" ? "down" : "up";
    },
    amounts(tx) {
      return tx.tx.value.msg[0].value.amount;
    },
  },
};
</script>
