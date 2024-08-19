import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authentication';

export const LOGIN_ROUTE_PATH = '/login',
  ROOMS_ROUTE_PATH = '/rooms';

const redirectForLogin = async (to, from, next) => {
  const authStore = useAuthStore();

  if (!authStore.user && to.path !== LOGIN_ROUTE_PATH) {
    return next(LOGIN_ROUTE_PATH);
  } else if (authStore.user && to.path === LOGIN_ROUTE_PATH || to.name === 'home') {
    return next(ROOMS_ROUTE_PATH);
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
      path: ROOMS_ROUTE_PATH,
      name: 'planning-rooms',
      component: () => import('../views/RoomsListView.vue')
    },
    {
      name: 'room-creation',
      path: '/create-room',
      component: () => import('@/views/CreateRoomView.vue')
    },
    {
      path: LOGIN_ROUTE_PATH,
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/:matchAllOthers(.*)*',
      name: 'notfound',
      component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

router.beforeEach(redirectForLogin);

export default router
