import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('./index.vue'),
    meta: {
      title: 'Weather Widget',
      requiresAuth: false
    }
  }
];

export default routes;

