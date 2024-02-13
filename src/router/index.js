import HomeView from '../views/HomeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

import { authGuard } from '../utils/connexion';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },

    {
      path: '/menu',
      name: 'menu',
      component: () => import('../views/MenuView.vue')
    },
    {
      path: '/connexion',
      name: 'connexion',
      component: () => import('../views/ConnexionView.vue')
    },
    {
      path: '/deconnexion',
      name: 'deconnexion',
      component: () => import('../views/DeconnexionView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/ProfilView.vue'),
      beforeEnter: authGuard,
    },
    {
      path: '/pays/:NomPays',
      name: 'pays',
      component: () => import('../views/PaysView.vue'),
    },
    {
      path: '/compare-pays',
      name: 'comparePays',
      component: () => import('../views/ComparePaysView.vue'),
    },
    {
      path: '/marque/:id',
      name: 'Marque',
      component: () => import('../views/MarqueView.vue'),
    },
    {
      path: '/voiture/:id',
      name: 'Voiture',
      component: () => import('../views/VoitureView.vue'),
    },
    {
      path: '/listePays',
      name: 'listePays',
      component: () => import('../views/ListePaysView.vue'),
    },
    {
      path: '/listeMarques',
      name: 'listeMarques',
      component: () => import('../views/ListeMarquesView.vue'),
    },
    {
      path: '/listeVoitures',
      name: 'listeVoitures',
      component: () => import('../views/ListeVoituresView.vue'),
    },

  ]
})

export default router