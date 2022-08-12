import type { ILoginState } from "./login/type";
import type { ISystemState } from "./main/system/type";
import type { IDashboardState } from "./main/analysis/type";
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
  entireMenu: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
  dashboard: IDashboardState;
}

export type IStoreType = IRootState & IRootWithModule;
