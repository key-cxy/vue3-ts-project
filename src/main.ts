import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/theme-chalk/el-message.css";

// 路由
import router from "./router";
// vuex
import store from "./store";
// 测试axios
import myRequest from "@/service/index";
myRequest
  .post({
    url: "/login",
    data: {
      name: "coderwhy",
      password: "123456"
    },
    interceptors: {
      requestInterceptor: (config) => {
        console.log("单个请求请求拦截器 --- 成功");
        return config;
      },
      requestInterceptorCatch: (res) => {
        console.log("单个请求请求拦截器 --- 失败");
        return res;
      },
      responseInterceptor: (res) => {
        console.log("单个请求响应拦截器 -- 成功");
        return res;
      },
      responseInterceptorCatch: (res) => {
        console.log("单个请求响应拦截器 --- 失败");
        return res;
      }
    }
  })
  .then((res) => {
    console.log(res, 888);
  });

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
