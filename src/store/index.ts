import { createStore, Store, useStore as useVuexStore } from "vuex";
import type { IRootState, IStoreType } from "./type";

import loginModule from "./login/login";
import systemModule from "./main/system/system";

import { getPageListData } from "@/service/main/system/system";

const store = createStore<IRootState>({
  state() {
    return {
      name: "key",
      age: 18,
      entireDepartment: [],
      entireRole: []
    };
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list;
    },
    changeEntireRole(state, list) {
      state.entireRole = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求部门和角色数据
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000
      });
      const { list: departmentList } = departmentResult.data;
      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000
      });
      const { list: roleList } = roleResult.data;

      // 2.保存数据
      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
    }
  },
  getters: {},
  modules: {
    login: loginModule,
    system: systemModule
  }
});

export function setupStore() {
  store.dispatch("login/loadLocalLogin");
  store.dispatch("getInitialDataAction");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
