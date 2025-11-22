
import { LAYOUT_ENUM } from '@/layouts/useLayout';

export const PAGE_NAME_ENUM = {
  HOME: 'Home',
  NOT_FOUND: 'NotFound',
}

export const routes = [
   {
    path: '/',
    name: PAGE_NAME_ENUM.HOME,
    meta: { layout: LAYOUT_ENUM.DEFAULT },
    component: () => import('../views/HomeView.vue'),
  },

  {
    path: '/:catchAll(.*)',
    name: PAGE_NAME_ENUM.NOT_FOUND,
    redirect: { name: PAGE_NAME_ENUM.HOME },
  },
]
