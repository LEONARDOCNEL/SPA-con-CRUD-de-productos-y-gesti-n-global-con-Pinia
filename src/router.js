import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import { h } from 'vue'

// Definimos las vistas directamente aquí
const Inicio = { template: `<div><h2>Inicio</h2><p>Bienvenido a la SPA de productos.</p></div>` }

const Productos = () => import('./App.vue').then(() => ({
  template: `<div></div>` // Placeholder (se renderiza dinámicamente dentro de App.vue)
}))

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Inicio', component: Inicio },
    { path: '/productos', name: 'Productos', component: { render: () => h('div') } },
    { path: '/productos/crear', name: 'Crear', component: { render: () => h('div') } },
    { path: '/productos/:id', name: 'Editar', component: { render: () => h('div') }, props: true },
    { path: '/carrito', name: 'Carrito', component: { render: () => h('div') } }
  ]
})

