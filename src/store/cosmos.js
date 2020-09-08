import axios from "axios";
import {
  Secp256k1Wallet,
  SigningCosmosClient,
  makeCosmoshubPath,
  coins,
} from "@cosmjs/launchpad";

const CUSTOM_URL =
  process.env.VUE_APP_CUSTOM_URL && new URL(process.env.VUE_APP_CUSTOM_URL);
const API =
  (CUSTOM_URL && `${CUSTOM_URL.protocol}//1317-${CUSTOM_URL.hostname}`) ||
  "https://lcd.nylira.net";
const ADDRESS_PREFIX = "cosmos";

export default {
  namespaced: true,
  state: {
    API,
    account: {},
    chain_id: "",
    data: {},
    client: null,
    validators: [],
    delegations: [],
    stakingPool: {},
    transfersIncoming: [],
    transfersOutgoing: [],
  },
  mutations: {
    set(state, { key, value }) {
      state[key] = value;
    },
  },
  actions: {
    async init({ dispatch, state }) {
      dispatch("stakingPoolFetch");
      dispatch("validatorsFetch");
      await dispatch("chainIdFetch");
      const mnemonic = localStorage.getItem("mnemonic");
      if (mnemonic) {
        await dispatch("accountSignIn", { mnemonic });
      }
    },
    async delegationsFetch({ state, commit }) {
      if (!state.client) return;
      const address = state.client.senderAddress;
      const url = `${API}/staking/delegators/${address}/delegations`;
      const value = (await axios.get(url)).data.result;
      commit("set", { key: "delegations", value });
    },
    async tokensSend({ state }, { amount, to_address, memo = "" }) {
      const from_address = state.client.senderAddress;
      const msg = {
        type: "cosmos-sdk/MsgSend",
        value: {
          amount: [
            {
              amount,
              denom: "uatom",
            },
          ],
          from_address,
          to_address,
        },
      };
      const fee = {
        amount: coins(5000, "uatom"),
        gas: "200000",
      };
      return await state.client.signAndPost([msg], fee, memo);
    },
    async chainIdFetch({ commit }) {
      const url = `${API}/node_info`;
      const value = (await axios.get(url)).data.node_info.network;
      commit("set", { key: "chain_id", value });
    },
    async stakingPoolFetch({ commit }) {
      const url = `${API}/staking/pool`;
      const value = (await axios.get(url)).data.result;
      commit("set", { key: "stakingPool", value });
    },
    async accountSignOut({ commit }) {
      localStorage.removeItem("mnemonic");
      window.location.reload();
    },
    async accountSignIn({ commit, dispatch }, { mnemonic }) {
      return new Promise(async (resolve, reject) => {
        const wallet = await Secp256k1Wallet.fromMnemonic(
          mnemonic,
          makeCosmoshubPath(0),
          ADDRESS_PREFIX
        );
        const [{ address }] = await wallet.getAccounts();
        const url = `${API}/auth/accounts/${address}`;
        const acc = (await axios.get(url)).data;
        if (acc.result.value.address === address) {
          localStorage.setItem("mnemonic", mnemonic);
          const account = acc.result.value;
          const client = new SigningCosmosClient(API, address, wallet);
          commit("set", { key: "account", value: account });
          commit("set", { key: "client", value: client });
          dispatch("delegationsFetch");
          dispatch("transfersIncomingFetch");
          dispatch("transfersOutgoingFetch");
          resolve(account);
        } else {
          reject("Account doesn't exist.");
        }
      });
    },
    async validatorsFetch({ commit }) {
      const url = `${API}/staking/validators`;
      const value = (await axios.get(url)).data.result;
      commit("set", { key: "validators", value });
    },
    async accountUpdate({ state, commit }) {
      const url = `${API}/auth/accounts/${state.client.senderAddress}`;
      const acc = (await axios.get(url)).data;
      const value = acc.result.value;
      commit("set", { key: "account", value });
    },
    async transfersIncomingFetch({ state, commit }) {
      const address = state.client.senderAddress;
      const url = `${API}/txs?transfer.recipient=${address}&limit=100`;
      const value = (await axios.get(url)).data.txs;
      commit("set", { key: "transfersIncoming", value });
    },
    async transfersOutgoingFetch({ state, commit }) {
      const address = state.client.senderAddress;
      const url = `${API}/txs?message.sender=${address}&limit=100`;
      const value = (await axios.get(url)).data.txs;
      commit("set", { key: "transfersOutgoing", value });
    },
  },
};
