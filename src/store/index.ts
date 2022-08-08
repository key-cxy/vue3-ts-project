import { createStore } from "vuex";
import type { IRootState } from "./type";
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
  modules: {}
});

export default store;
