<template>
  <div>
    <div class="container">
      <app-h2>Send tokens</app-h2>
      <div class="card">
        <label class="row">
          <div class="row__label">To:</div>
          <div class="row__value">
            <input
              v-model="to_address"
              type="text"
              name="to_address"
              class="row__value__input"
              placeholder="Address"
            />
          </div>
        </label>
        <label class="row">
          <div class="row__label">Amount:</div>
          <div class="row__value">
            <input
              v-model="amount"
              type="text"
              class="row__value__input"
              placeholder="Amount of tokens"
            />
          </div>
        </label>
        <label class="row">
          <div class="row__label">Memo:</div>
          <div class="row__value">
            <input
              v-model="memo"
              type="text"
              class="row__value__input"
              placeholder="Memo message"
            />
          </div>
        </label>
        <div class="row">
          <div class="row__toolbar">
            <div class="button" @click="send">Send</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input {
  background: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
}
.container {
  margin-top: 4rem;
}
.row {
  background: rgba(0, 0, 0, 0.03);
  margin-bottom: 2px;
  display: flex;
  align-items: center;
  position: relative;
}
.row__label {
  padding: 0.75rem;
  width: 25%;
  max-width: 200px;
}
.row__value {
  position: relative;
  width: 100%;
  box-sizing: border-box;
}
.row__value__input {
  padding: 0.5rem;
  width: 100%;
  box-sizing: border-box;
}
.row__toolbar {
  padding: 0.75rem;
  display: flex;
  justify-content: flex-end;
  width: 100%;
}
.button {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.75);
  cursor: pointer;
}
.row:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}
.row:last-child {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
.row__label {
  color: rgba(0, 0, 0, 0.35);
}
</style>

<script>
import AppH2 from "@/components/AppH2.vue";

export default {
  components: {
    AppH2,
  },
  data() {
    return {
      to_address: "",
      amount: "",
      memo: "",
    };
  },
  methods: {
    async send() {
      const payload = {
        to_address: this.to_address,
        amount: parseInt(this.amount).toString(),
        memo: this.memo,
      };
      try {
        await this.$store.dispatch("cosmos/tokensSend", { ...payload });
        console.log("success");
      } catch {
        console.log("error");
      }
      this.to_address = this.amount = this.memo = "";
      await this.$store.dispatch("cosmos/accountUpdate");
    },
  },
};
</script>
