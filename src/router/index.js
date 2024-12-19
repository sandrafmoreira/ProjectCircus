import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('../views/GalleryView.vue'),
    },
    {
      path: '/activities',
      name: 'activities',
      component: () => import('../views/ActivitiesView.vue'),
    },
    {
      path: '/pricing',
      name: 'pricing',
      component: () => import('../views/PricingView.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/account/:userEmail',
      name: 'account',
      component: () => import('../views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/giftshop',
      name: 'giftshop',
      component: () => import('../views/GiftshopView.vue'),
    },

    {
      path: '/giftshop/:id',
      name: 'gift',
      component: () => import('../views/GiftView.vue'),
    },
    {
      path: '/news',
      name: 'news',
      component: () => import('../views/NewsView.vue'),
    },
    {
      path: '/article/:id',
      name: 'article',
      component: () => import('../views/NewsArticleView.vue'),
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: () => import('../views/ContactsView.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated")

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({path: "/login", query: {from: to.path}});
  } else {
    next()
  }
})

export default router