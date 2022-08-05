import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import appLayout from '@/views/app/AppView.vue'

const routes: Array<RouteRecordRaw> = [
  // App Layout
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'home',
        meta: { login: true, module_id: 1000, min_access: 3 },
        component: () => import(/* webpackChunkName: "home" */ '@/views/app/home/Home.vue'),
      },
    ],
  },
  {
    path: '/workspace',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'Workspace',
        meta: { login: true, module_id: 1000, min_access: 3 },
        component: () => import(/* webpackChunkName: "workspace" */ '@/views/app/workspaces/Workspaces.vue'),
      },
    ],
  },
  {
    path: '/favorite',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'Favorite',
        meta: { login: true, module_id: 1000, min_access: 3 },
        component: () => import(/* webpackChunkName: "workspace" */ '@/views/app/favorite/Favorite.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router
