import myRequest from "@/service";

import { IDataType } from "../type";
import type { IAccount, ILoginResult } from "./type";

enum LoginAPI {
  AccountLogin = "/login",
  LoginUserInfo = "/users/", // 用法: /users/1
  UserMenus = "/role/" // 用法: role/1/menu
}

export function accountLoginRequest(account: IAccount) {
  return myRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  });
}

export function requestUserInfoById(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  });
}

export function requestUserMenusByRoleId(id: number) {
  return myRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + "/menu",
    showLoading: false
  });
}
