import { createApp } from "vue";
import App from "./App.vue";
import "element-plus/theme-chalk/el-message.css";
import "normalize.css";
import "./assets/css/index.less";

import { globalRegister } from "./global";

// 路由
import router from "./router";
// vuex
import store from "./store";
import { setupStore } from "./store";

const app = createApp(App);

app.use(globalRegister);
setupStore();
app.use(router);
app.use(store);

app.mount("#app");
