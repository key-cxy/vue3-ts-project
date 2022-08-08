import MyRequest from "./request";

import { BASE_URL, TIME_OUT } from "./request/config";
const myRequest = new MyRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      console.log("实例请求拦截器 --- 成功");
      return config;
    },
    requestInterceptorCatch: (res) => {
      console.log("实例请求拦截器 --- 失败");
      return res;
    },
    responseInterceptor: (res) => {
      console.log("实例响应拦截器 -- 成功");
      return res;
    },
    responseInterceptorCatch: (res) => {
      console.log("实例响应拦截器 --- 失败");
      return res;
    }
  }
});

export default myRequest;
