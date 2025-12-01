import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./index.vue'),
    meta: {
      title: 'Page Not Found'
    }
  }
];

export default routes;

