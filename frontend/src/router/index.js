import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authentication';

export const LOGIN_ROUTE_PATH = '/login',
  DASHBOARD_ROUTE_PATH = '/dashboard';

const redirectForLogin = async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user && to.path !== LOGIN_ROUTE_PATH) {
    return next(LOGIN_ROUTE_PATH);
  } else if (authStore.user && to.path === LOGIN_ROUTE_PATH || to.name === 'home') {
    return next(DASHBOARD_ROUTE_PATH);
  }
  
  next();
};
  
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      beforeEnter: redirectForLogin
    },
    {
      path: DASHBOARD_ROUTE_PATH,
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue')
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../views/ReportsView.vue')
    },
    {
      path: LOGIN_ROUTE_PATH,
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
  ]
})

router.beforeEach(redirectForLogin);

export default router
