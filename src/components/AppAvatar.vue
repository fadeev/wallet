<template>
  <div>
    <div v-html="avatar(seed)"></div>
  </div>
</template>

<script>
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-bottts-sprites";

export default {
  props: {
    seed: {
      default: "empty",
    },
  },
  methods: {
    avatar(seed) {
      const avatars = new Avatars(sprites, {});
      return avatars.create(seed);
    },
  },
};
</script>
