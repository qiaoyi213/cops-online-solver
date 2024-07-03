import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/ssp',
      name: 'ssp',
      component: () => import('../views/SSPView.vue')
    },
    {
      path: '/mcp',
      name: 'mcp',
      component: () => import('../views/MCPView.vue')
    },
    {
      path: '/vcp',
      name: 'vcp',
      component: () => import('../views/VCPView.vue')
    },
    {
      path: '/01kp',
      name: '01kp',
      component: () => import('../views/01KPView.vue')
    },
    {
      path: '/gcp',
      name: 'gcp',
      component: () => import('../views/GCPView.vue')
    },
    {
      path: '/hcp',
      name: 'hcp',
      component: () => import('../views/HCPView.vue')
    }, 
    {
      path: '/tsp',
      name: 'tsp',
      component: () => import('../views/TSPView.vue')
    }, 
    {
      path: '/jsp',
      name: 'jsp',
      component: () => import('../views/JSPView.vue')
    }
  ]
})

export default router
