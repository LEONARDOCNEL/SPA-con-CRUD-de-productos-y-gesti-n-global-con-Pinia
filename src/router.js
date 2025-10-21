import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/', 
    name: 'Inicio', 
    component: { 
      template: '<div><h2>Inicio</h2><p>Bienvenido a la SPA de productos.</p></div>' 
    } 
  },
  { 
    path: '/productos', 
    name: 'Productos', 
    component: { template: '<div></div>' } 
  },
  { 
    path: '/productos/crear', 
    name: 'Crear', 
    component: { template: '<div></div>' } 
  },
  { 
    path: '/productos/:id', 
    name: 'Editar', 
    component: { template: '<div></div>' },
    props: true 
  },
  { 
    path: '/carrito', 
    name: 'Carrito', 
    component: { template: '<div></div>' } 
  }
]

export default createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/SPA-con-CRUD-de-productos-y-gesti-n-global-con-Pinia/' : '/'),
  routes
})