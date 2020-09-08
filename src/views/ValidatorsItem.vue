<template>
  <div>
    <app-container>
      <div v-if="validator">
        <app-h2>{{ validator.description.moniker }}</app-h2>
        <p>{{ validator.description.details }}</p>
        <p>
          Website:
          <a :href="makeURL(validator.description.website)" target="_blank">{{
            validator.description.website
          }}</a>
        </p>
        <p>Validator address: {{ validator.operator_address }}</p>
      </div>
    </app-container>
  </div>
</template>

<script>
import AppContainer from "@/components/AppContainer.vue";
import AppH2 from "@/components/AppH2.vue";
import { find } from "lodash";

export default {
  components: {
    AppContainer,
    AppH2,
  },
  props: {
    address: {
      type: String,
    },
  },
  computed: {
    validator() {
      const validators = this.$store.state.cosmos.validators;
      return find(validators, ["operator_address", this.address]);
    },
  },
  methods: {
    makeURL(string) {
      if (string.match(/^https?:\/\//)) {
        return string;
      } else {
        return `http://${string}`;
      }
    },
  },
};
</script>
