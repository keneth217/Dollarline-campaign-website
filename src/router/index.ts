import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/HomePage.vue'
import HopeGate from '@/views/HopeGate.vue'
import Register from '@/views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/hopegate', name: 'hopegate', component: HopeGate },
    { path: '/register', name: 'register', component: Register },
  ],
})

export default router
