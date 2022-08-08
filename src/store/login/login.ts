import type { Module } from "vuex";
import type { IRootState } from "../type";
import type { ILoginState } from "./type";
import type { IAccount } from "@/service/login/type";

import local from "@/utils/cache";
import router from "@/router";

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenusByRoleId
} from "@/service/login/login";

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: "",
      userInfo: {},
      userMenus: [],
      permissions: []
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload);
      const { token, id } = loginResult.data;
      commit("changeToken", token);
      local.setCache("token", token);

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id);
      const userInfo = userInfoResult.data;
      commit("changeUserInfo", userInfo);
      local.setCache("userInfo", userInfo);

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id);
      const userMenus = userMenusResult.data;
      commit("changeUserMenus", userMenus);
      local.setCache("userMenus", userMenus);

      // 4.跳到首页
      router.push("/main");
    }
  },
  getters: {}
};

export default loginModule;
