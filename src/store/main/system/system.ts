import { Module } from "vuex";
import type { ISystemState } from "./type";
import type { IRootState } from "@/store/type";

import {
  getPageListData,
  createPageData,
  deletePageData,
  editPageData
} from "@/service/main/system/system";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
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
    },
    changeGoodsList(state, list: any[]) {
      state.goodsList = list;
    },
    changeGoodsCount(state, count: number) {
      state.goodsCount = count;
    },
    changeMenuList(state, list: any[]) {
      state.menuList = list;
    },
    changeMenuCount(state, count: number) {
      state.menuCount = count;
    }
  },
  actions: {
    // 列表数据
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
    },
    // 创建
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据请求
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      await createPageData(pageUrl, newData);
      // 2.请求最新数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 编辑
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload;
      console.log(editData);
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);

      // 2.请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    },
    // 删除
    async deletePageDataAction({ dispatch }, payload: any) {
      // 1.获取pageName和id
      // pageName -> /users
      // id -> /users/id
      const { pageName, id } = payload;
      const pageUrl = `/${pageName}/${id}`;

      // 2.调用删除网络请求
      await deletePageData(pageUrl);

      // 3.重新请求最新的数据
      dispatch("getPageListAction", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      });
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    }
  }
};

export default systemModule;
