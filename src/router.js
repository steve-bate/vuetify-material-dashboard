import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: () => import('@/views/dashboard/pages/Login'),
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/',
      component: () => import('@/views/dashboard/Index'),
      children: [
        // Dashboard
        {
          name: 'Dashboard',
          path: '',
          component: () => import('@/views/dashboard/Dashboard'),
        },
        // Pages
        {
          name: 'User Profile',
          path: 'pages/user',
          component: () => import('@/views/dashboard/pages/UserProfile'),
        },
        {
          name: 'Markets',
          path: 'pages/markets',
          component: () => import('@/views/dashboard/pages/Markets'),
        },
        {
          name: 'Weather',
          path: 'pages/weather',
          component: () => import('@/views/dashboard/pages/Weather'),
        },
        {
          name: 'COVID',
          path: 'pages/covid',
          component: () => import('@/views/dashboard/pages/Covid'),
        },
        // Maps
        {
          name: 'Google Maps',
          path: 'maps/google-maps',
          component: () => import('@/views/dashboard/maps/GoogleMaps'),
        },
      ],
    },
  ],
})
