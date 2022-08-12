import { RouteRecordRaw } from "vue-router";
import type { IBreadcrumb } from "@/base-ui/breadcrumb";

let firstMenu: any = null;
// 获取所有动态路由
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = [];

  // 1.先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = [];
  const routeFiles = require.context("../router/main", true, /\.ts$/);
  routeFiles.keys().forEach((key) => {
    const route = require("../router/main" + key.split(".")[1]);
    allRoutes.push(route.default);
  });

  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((route) => route.path === menu.url);
        if (route) {
          routes.push(route);
          if (!firstMenu) firstMenu = route;
        }
      } else {
        _recurseGetRoute(menu.children);
      }
    }
  };
  _recurseGetRoute(userMenus);
  return routes;
}

// 获取当前menu default-value
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: any[]
): any {
  for (const menu of userMenus) {
    if (menu.type === 2 && menu.url === currentPath) {
      breadcrumbs?.push({ name: menu.name });
      return menu;
    } else if (menu.type === 1) {
      const findMenu = pathMapToMenu(menu.children, currentPath);
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name });
        breadcrumbs?.push({ name: findMenu.name });
        return findMenu;
      }
    }
  }

  return;
}

export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = [];
  pathMapToMenu(userMenus, currentPath, breadcrumbs);
  return breadcrumbs;
}

// 获取权限
export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: any[] = [];

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? []);
      } else if (menu.type === 3) {
        permissions.push(menu.permission);
      }
    }
  };
  _recurseGetPermission(userMenus);

  return permissions;
}

export function menuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = [];

  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children);
      } else {
        leftKeys.push(menu.id);
      }
    }
  };
  _recurseGetLeaf(menuList);

  return leftKeys;
}

export { firstMenu };
