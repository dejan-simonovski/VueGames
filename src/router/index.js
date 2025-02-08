import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SnakeView from '../views/SnakeView.vue'
import TicTacToeView from '../views/TicTacToeView.vue'
import HangmanView from '../views/HangmanView.vue'
import MemoryView from '../views/MemoryView.vue'
import LoginView from '../views/LoginView.vue'
import { isAuthenticated } from '@/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/snake',
    name: 'Snake',
    component: SnakeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    component: TicTacToeView,
     meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/hangman',
    name: 'Hangman',
    component: HangmanView,
    meta: { requiresAuth: true }
  },
  {
    path: '/memorygame',
    name: 'Memory',
    component: MemoryView,
    meta: { requiresAuth: true }
  }

  // {
  //   path: '/about',
  //   name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router
