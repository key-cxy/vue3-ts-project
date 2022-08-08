import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import local from "@/utils/cache";
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/main"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/login.vue")
  },
  {
    path: "/main",
    name: "main",
    component: () => import("@/views/main/main.vue")
  }
];

const router = createRouter({
  routes,
  history: createWebHashHistory()
});

router.beforeEach((to) => {
  if (to.path !== "/login") {
    const token = local.getCache("token");
    if (!token) {
      return "/login";
    }
  }
});

export default router;
