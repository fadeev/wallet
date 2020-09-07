<template>
  <div>
    Transaction List
    {{ transfersIncoming }}
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";

export default {
  computed: {
    state() {
      return this.$store && this.$store.state;
    },
    API() {
      let API = this.$store && this.$store.state && this.$store.state.API;
      return API || "http://localhost:1317";
    },
    addr() {
      let acc = this.$store && this.$store.state && this.$store.state.account;
      return acc || this.address;
    },
    transfersIncoming() {
      if (this.state) {
        return this.state.transfersIncoming;
      }
    },
  },
  created() {
    // axios.get(`${this.API}/txs?transfer.recipient=${this.addr}&limit=100`);
    // axios.get(`${this.API}/txs?message.sender=${this.addr}&limit=100`);
  },
};
</script>
