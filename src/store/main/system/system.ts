import { Module } from "vuex";
import type { ISystemState } from "./type";
import type { IRootState } from "@/store/type";

import { getPageListData } from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    };
  },
  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList;
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount;
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList;
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName;
      const pageUrl = `/${pageName}/list`;

      const pageResult = await getPageListData(pageUrl, payload.queryInfo);
      const { totalCount, list } = pageResult.data;

      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1).toLowerCase();

      commit(`change${changePageName}List`, list);
      commit(`change${changePageName}Count`, totalCount);
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    }
  }
};

export default systemModule;
