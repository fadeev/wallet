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
  state: {
    // API: "https://lcd.nylira.net",
    account: {},
    chain_id: "",
    data: {},
    client: null,
    validators: [],
    delegations: [],
    stakingPool: {},
    transfersIncoming: [],
  },
  mutations: {
    accountUpdate(state, { account }) {
      state.account = account;
    },
    chainIdSet(state, { chain_id }) {
      state.chain_id = chain_id;
    },
    entitySet(state, { type, body }) {
      const updated = {};
      updated[type] = body;
      state.data = { ...state.data, ...updated };
    },
    clientUpdate(state, { client }) {
      state.client = client;
    },
    validatorsSet(state, { validators }) {
      state.validators = validators;
    },
    delegationsSet(state, { delegations }) {
      state.delegations = delegations;
    },
    stakingPoolSet(state, { stakingPool }) {
      state.stakingPool = stakingPool;
    },
    stateSet(state, key, value) {
      console.log(value);
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
      dispatch("transfersIncomingFetch");
    },
    async delegationsFetch({ state, commit }) {
      if (!state.client) return;
      const address = state.client.senderAddress;
      const url = `${API}/staking/delegators/${address}/delegations`;
      const delegations = (await axios.get(url)).data.result;
      commit("delegationsSet", { delegations });
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
      const node_info = (await axios.get(`${API}/node_info`)).data.node_info;
      commit("chainIdSet", { chain_id: node_info.network });
    },
    async stakingPoolFetch({ commit }) {
      const stakingPool = (await axios.get(`${API}/staking/pool`)).data.result;
      commit("stakingPoolSet", { stakingPool });
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
          commit("accountUpdate", { account });
          commit("clientUpdate", { client });
          dispatch("delegationsFetch");
          resolve(account);
        } else {
          reject("Account doesn't exist.");
        }
      });
    },
    async validatorsFetch({ commit }) {
      const url = `${API}/staking/validators`;
      const validators = (await axios.get(url)).data.result;
      commit("validatorsSet", { validators });
    },
    async entityFetch({ state, commit }, { type }) {
      const { chain_id } = state;
      const url = `${API}/${chain_id}/${type}`;
      const body = (await axios.get(url)).data.result;
      commit("entitySet", { type, body });
    },
    async accountUpdate({ state, commit }) {
      const url = `${API}/auth/accounts/${state.client.senderAddress}`;
      const acc = (await axios.get(url)).data;
      const account = acc.result.value;
      commit("accountUpdate", { account });
    },
    async entitySubmit({ state }, { type, body }) {
      const { chain_id } = state;
      const creator = state.client.senderAddress;
      const base_req = { chain_id, from: creator };
      const req = { base_req, creator, ...body };
      const { data } = await axios.post(`${API}/${chain_id}/${type}`, req);
      const { msg, fee, memo } = data.value;
      return await state.client.signAndPost(msg, fee, memo);
    },
    async transfersIncomingFetch({ state, commit }) {
      const address = state.client.senderAddress;
      const url = `${API}/txs?transfer.recipient=${address}&limit=100`;
      const data = (await axios.get(url)).data;
      commit("stateSet", "transfersIncoming", data);
    },
  },
};
