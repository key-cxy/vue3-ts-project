import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import type { MyRequestInterceptors, MyRequestConfig } from "./type";
import { ElLoading } from "element-plus";
import { LoadingInstance } from "element-plus/lib/components/loading/src/loading.js";
const DEAFULT_LOADING = true;

class MyRequest {
  instance: AxiosInstance;
  interceptors?: MyRequestInterceptors;
  showLoading: boolean;
  loading?: LoadingInstance;

  constructor(config: MyRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);

    // 初始化数据
    this.interceptors = config.interceptors;
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;

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
        // console.log("全局请求拦截器 --- 成功");
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: "Loading...",
            background: "rgba(0, 0, 0, 0.5)"
          });
        }
        return config;
      },
      (err: any) => {
        // console.log("全局请求拦截器 --- 失败");
        return err;
      }
    );
    // 添加全局响应拦截器
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        // console.log("全局响应拦截器 --- 成功");
        this.loading?.close();

        const data = response.data;
        if (data.returnCode === "-1001") {
          console.log("请求失败~, 错误信息");
        } else {
          return data;
        }
      },
      (err: any) => {
        // console.log("全局响应拦截器 --- 失败");
        this.loading?.close();
        // 例子: 判断不同的HttpErrorCode显示不同的错误信息
        if (err.response.status === 404) {
          console.log("404的错误~");
        }
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

      // 判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading;
      }

      this.instance.request<any, T>(config).then(
        (res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          // 将结果resolve返回出去
          resolve(res);
        },
        (err) => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        }
      );
    });
  }

  //
  get<T = any>(config: MyRequestConfig<T>): Promise<T> {
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
