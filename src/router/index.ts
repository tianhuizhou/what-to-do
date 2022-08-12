import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import appLayout from '@/views/app/AppView.vue'
import externalLayout from '@/views/external/ExternalView.vue'
import AuthGuard from '@/router/auth_guard'

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
        meta: { login: true },
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
        name: 'workspace',
        meta: { login: true },
        component: () => import(/* webpackChunkName: "workspace" */ '@/views/app/workspace/Workspace.vue'),
      },
    ],
  },
  {
    path: '/favorite',
    component: appLayout,
    children: [
      {
        path: '',
        name: 'favorite',
        meta: { login: true },
        component: () => import(/* webpackChunkName: "workspace" */ '@/views/app/favorite/Favorite.vue'),
      },
    ],
  },

  // External Layout
  {
    path: '/user',
    component: externalLayout,
    redirect: '/user/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '@/views/external/user/Login.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach(AuthGuard)

router.afterEach((to) => {
  // @ts-ignore
  document.title = to.name ? `${to.name} - What ToDo` : 'What ToDo'
})
export default router
