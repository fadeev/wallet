<template>
  <div>
    <div class="container">
      <app-h2>{{ address ? "Your Account" : "Sign in" }}</app-h2>
      <div v-if="!address" class="password">
        <input
          type="text"
          v-model="password"
          class="password__input"
          placeholder="Password (mnemonic)"
        />
        <div
          :class="[
            'button',
            `button__error__${!!error}`,
            `button__enabled__${!!mnemonicValid}`,
          ]"
          @click="signIn"
        >
          Sign in
        </div>
      </div>
      <div v-else class="account">
        <div class="card">
          <div class="card__row">
            <div class="card__row__left">
              <div class="card__icon">
                <icon-user />
              </div>
              <div class="card__desc">
                {{ address }}
              </div>
            </div>
            <div class="signout" @click="signOut">
              Sign out
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-bottom: 1.5rem;
}
.card {
  background: rgba(0, 0, 0, 0.03);
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.75rem;
  overflow-x: hidden;
}
.card__row {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
  color: rgba(0, 0, 0, 0.25);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.5;
  justify-content: space-between;
}
.card__row__left {
  display: flex;
  align-items: center;
}
.card__icon {
  width: 1.75rem;
  height: 1.75rem;
  fill: rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
}
.card__desc {
  letter-spacing: 0.02em;
  padding: 0 0.5rem;
  word-break: break-all;
}
.password {
  margin-top: 0.5rem;
  display: flex;
}
.password__input {
  border: none;
  width: 100%;
  padding: 1.25rem 1rem;
  box-sizing: border-box;
  font-family: inherit;
  background: rgba(0, 0, 0, 0.03);
  font-size: 1rem;
  border-radius: 0.25rem;
  color: rgba(0, 0, 0, 0.5);
}
.button {
  margin-left: 1rem;
  background: rgba(0, 0, 0, 0.03);
  padding: 0 1.5rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.25);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
  transition: all 0.1s;
  user-select: none;
}
.button.button__error__true {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  background: rgba(255, 228, 228, 0.5);
  color: rgb(255, 0, 0);
}
.button__enabled__false {
  cursor: not-allowed;
}
.button__enabled__true {
  color: rgba(0, 125, 255);
  font-weight: 700;
  cursor: pointer;
}
.button__enabled__true:active {
  color: rgba(0, 125, 255, 0.65);
}
.password__input:focus {
  outline: none;
  background: rgba(0, 0, 0, 0.06);
  color: rgba(0, 0, 0, 0.5);
}
.password__input::placeholder {
  color: rgba(0, 0, 0, 0.35);
  font-weight: 500;
}
.signout {
  margin-left: 1rem;
  background: white;
  padding: 0.5rem 1.5rem;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 0.85rem;
  color: rgba(0, 0, 0, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: 0.25rem;
  transition: all 0.1s;
  user-select: none;
  /* box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.07); */
}
.signout:active {
  transform: scale(0.98);
  color: rgba(0, 0, 0, 0.35);
}
@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

<script>
import IconUser from "@/components/IconUser.vue";
import AppH2 from "@/components/AppH2.vue";
import * as bip39 from "bip39";

export default {
  components: {
    IconUser,
    AppH2,
  },
  data() {
    return {
      password: "",
      error: false,
    };
  },
  computed: {
    account() {
      return this.$store.state.cosmos.account;
    },
    address() {
      const { client } = this.$store.state.cosmos;
      const address = client && client.senderAddress;
      return address;
    },
    mnemonicValid() {
      return bip39.validateMnemonic(this.passwordClean);
    },
    passwordClean() {
      return this.password.trim();
    },
  },
  methods: {
    async signIn() {
      if (this.mnemonicValid && !this.error) {
        const mnemonic = this.passwordClean;
        this.$store.dispatch("cosmos/accountSignIn", { mnemonic }).catch(() => {
          this.error = true;
          setTimeout(() => {
            this.error = false;
          }, 1000);
        });
      }
    },
    async signOut() {
      this.$store.dispatch("cosmos/accountSignOut");
    },
  },
};
</script>
