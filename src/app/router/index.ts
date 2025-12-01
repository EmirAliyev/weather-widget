import { createRouter, createWebHistory, type RouteRecordRaw, type Router, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    requiresAuth?: boolean;
  }
}

const routes: RouteRecordRaw[] = [];

const routeFiles = require.context('@/pages', true, /router\.(ts)$/);
routeFiles.keys().forEach((key: string) => {
  const routeModule = routeFiles(key) as { default: RouteRecordRaw[] };
  routes.push(...routeModule.default);
});

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;

