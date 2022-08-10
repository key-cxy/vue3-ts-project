import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IStoreType } from "./type";

import loginModule from "./login/login";
const store = createStore<IRootState>({
  state() {
    return {
      name: "key",
      age: 18
    };
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login: loginModule
  }
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
