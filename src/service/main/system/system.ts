import myRequest from "../../index";

import type { IDataType } from "../../type";

export function getPageListData(url: string, payload: any) {
  return myRequest.post<IDataType>({ url, data: payload });
}
