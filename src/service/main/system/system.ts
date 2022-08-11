import myRequest from "../../index";

import type { IDataType } from "../../type";

// 列表数据
export function getPageListData(url: string, payload: any) {
  return myRequest.post<IDataType>({ url, data: payload });
}

// 删除
export function deletePageData(url: string) {
  return myRequest.post<IDataType>({
    url
  });
}

// 新增
export function createPageData(url: string, newData: any) {
  return myRequest.post<IDataType>({
    url,
    data: newData
  });
}

// 更新
export function editPageData(url: string, editData: any) {
  return myRequest.post<IDataType>({
    url,
    data: editData
  });
}
