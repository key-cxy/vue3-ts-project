import type { ILoginState } from "./login/type";
import type { ISystemState } from "./main/system/type";
export interface IRootState {
  name: string;
  age: number;
  entireDepartment: any[];
  entireRole: any[];
}

export interface IRootWithModule {
  login: ILoginState;
  system: ISystemState;
}

export type IStoreType = IRootState & IRootWithModule;
