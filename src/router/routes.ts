
import { LAYOUT_ENUM } from '@/layouts/useLayout';

export const PAGE_NAME_ENUM = {
  DASHBOARD: 'Dashboard',
  LOGIN: 'Login',
  REGISTER: 'Register',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  NOT_FOUND: 'NotFound',
}

export const routes = [
   {
    path: '/',
    name: PAGE_NAME_ENUM.DASHBOARD,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/DashboardView.vue'),
  },

  {
    path: '/login',
    name: PAGE_NAME_ENUM.LOGIN,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/auth/LoginView.vue'),
  },

  {
    path: '/register',
    name: PAGE_NAME_ENUM.REGISTER,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/auth/RegisterView.vue'),
  },

  {
    path: '/forgot-password',
    name: PAGE_NAME_ENUM.FORGOT_PASSWORD,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/auth/ForgotPasswordView.vue'),
  },

  {
    path: '/reset-password',
    name: PAGE_NAME_ENUM.RESET_PASSWORD,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/auth/ResetPasswordView.vue'),
  },

  {
    path: '/:catchAll(.*)',
    name: PAGE_NAME_ENUM.NOT_FOUND,
    redirect: { name: PAGE_NAME_ENUM.DASHBOARD },
  },
]
