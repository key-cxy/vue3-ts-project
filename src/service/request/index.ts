import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { MyRequestInterceptors, MyRequestConfig } from "./type";
class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;

  constructor(config: MyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 初始化数据
    this.interceptors = config.interceptors;

    // 添加实例请求拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    );
    // 添加实例响应拦截器
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    );

    // 添加全局请求拦截器
    this.instance.interceptors.request.use(
      (config: MyRequestConfig) => {
        console.log("全局请求拦截器 --- 成功");
        return config;
      },
      (err: any) => {
        console.log("全局请求拦截器 --- 失败");
        return err;
      }
    );
    // 添加全局响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log("全局响应拦截器 --- 成功");
        return response;
      },
      (err: any) => {
        console.log("全局响应拦截器 --- 失败");
        return err;
      }
    );
  }

  request<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }
      this.instance.request<any, T>(config).then(
        (res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          resolve(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  //
  get<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "GET" });
  }

  post<T>(config: MyRequestConfig<T>): Promise<T> {
    return this.request({ ...config, method: "POST" });
  }

  delete<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "DELETE" });
  }

  patch<T = any>(config: MyRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: "PATCH" });
  }
}

export default MyRequest;
