import type { AxiosRequestConfig, AxiosResponse } from "axios";
export interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (err: any) => any;
  responseInterceptor?: (response: T) => T;
  responseInterceptorCatch?: (err: any) => any;
}

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
  showLoading?: boolean;
}
