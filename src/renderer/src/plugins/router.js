import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { computed } from 'vue'

const routes = [
  {
    path: '/',
    component: () => import('../pages/warehouse/layout/MainLayout.vue'),
    meta: {
      auth: true
    },
    children: [
      {
        path: '',
        component: () => import('../pages/warehouse/transfer/WarehouseTransferPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('../pages/auth/layout/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../pages/auth/login/LoginPage.vue')
      },
      {
        path: 'hygenie',
        component: () => import('../pages/auth/hygiene/HygienePage.vue')
      }
    ]
  },
  {
    path: '/print',
    component: () => import('../pages/print/PrintPage.vue')
  }
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = computed(() => store.getters['auth/_employee'])

  if (to.meta?.auth && !isLoggedIn.value) {
    next('/auth/login')
  } else {
    next()
  }
})

export default router
