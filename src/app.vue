<template>
  <div id="app">
    <!-- NAV con clases CSS -->
    <nav class="navbar">
      <router-link to="/" class="nav-link">Inicio</router-link>
      <router-link to="/productos" class="nav-link">Productos</router-link>
      <router-link to="/productos/crear" class="nav-link">Crear</router-link>
      <router-link to="/carrito" class="nav-link">Carrito ({{ totalArticulos }})</router-link>
    </nav>

    <!-- RUTAS con clases CSS -->
    <div class="container">
      <div v-if="ruta === '/'" class="page">
        <h2>Inicio</h2>
        <p>SPA con Vue 3 + Pinia + Router. CRUD y carrito básico.</p>
      </div>

      <!-- PRODUCTOS -->
      <div v-else-if="ruta === '/productos'" class="page">
        <h2>Productos</h2>
        <div v-for="p in productos" :key="p.id" class="producto-card">
          <h3>{{ p.nombre }}</h3>
          <p class="descripcion">{{ p.descripcion }}</p>
          <p class="precio">${{ p.precio }}</p>
          <div class="botones">
            <button @click="editar(p.id)" class="btn btn-editar">Editar</button>
            <button @click="eliminar(p.id)" class="btn btn-eliminar">Eliminar</button>
            <button @click="agregar(p)" class="btn btn-agregar">Agregar al carrito</button>
          </div>
        </div>
      </div>

      <!-- CREAR PRODUCTO -->
      <div v-else-if="ruta === '/productos/crear'" class="page">
        <h2>Crear producto</h2>
        <div class="formulario">
          <input v-model="nuevo.nombre" placeholder="Nombre" class="input">
          <input v-model="nuevo.descripcion" placeholder="Descripción" class="input">
          <input v-model.number="nuevo.precio" type="number" placeholder="Precio" class="input">
          <div class="botones">
            <button @click="crear()" class="btn btn-guardar">Guardar</button>
            <button @click="ir('/productos')" class="btn btn-cancelar">Cancelar</button>
          </div>
        </div>
      </div>

      <!-- EDITAR PRODUCTO -->
      <div v-else-if="ruta.includes('/productos/') && ruta !== '/productos/crear'" class="page">
        <h2>Editar producto</h2>
        <div v-if="productoActual" class="formulario">
          <input v-model="productoActual.nombre" class="input">
          <input v-model="productoActual.descripcion" class="input">
          <input v-model.number="productoActual.precio" type="number" class="input">
          <div class="botones">
            <button @click="actualizar()" class="btn btn-guardar">Guardar</button>
            <button @click="ir('/productos')" class="btn btn-cancelar">Cancelar</button>
          </div>
        </div>
        <div v-else class="error"><p>Producto no encontrado.</p></div>
      </div>

      <!-- CARRITO -->
      <div v-else-if="ruta === '/carrito'" class="page">
        <h2>Carrito</h2>
        <div v-if="carrito.length === 0" class="carrito-vacio">
          <p>Carrito vacío.</p>
        </div>
        <div v-else>
          <div v-for="item in carrito" :key="item.id" class="item-carrito">
            <span class="item-nombre">{{ item.nombre }}</span>
            <span class="item-cantidad">(x{{ item.cantidad }})</span>
            <span class="item-precio">${{ item.precio * item.cantidad }}</span>
            <button @click="eliminarDelCarrito(item.id)" class="btn btn-eliminar">Eliminar</button>
          </div>
          <div class="total">
            <p><b>Total:</b> ${{ totalPrecio }}</p>
          </div>
          <button @click="vaciarCarrito" class="btn btn-vaciar">Vaciar carrito</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductoStore, useCarritoStore } from './stores/index.js'

const route = useRoute()
const router = useRouter()

const productoStore = useProductoStore()
const carritoStore = useCarritoStore()

// datos reactivos
const ruta = computed(() => route.fullPath)
const productos = computed(() => productoStore.productos)
const carrito = computed(() => carritoStore.carrito)
const totalArticulos = computed(() => carritoStore.totalArticulos)
const totalPrecio = computed(() => carritoStore.totalPrecio)

const nuevo = reactive({ nombre:'', descripcion:'', precio:0 })
const productoActual = reactive({})

// funciones CRUD
function crear() {
  productoStore.crearProducto(nuevo)
  Object.assign(nuevo, { nombre:'', descripcion:'', precio:0 })
  ir('/productos')
}
function editar(id) {
  const p = productoStore.obtenerProductoPorId(id)
  if (p) Object.assign(productoActual, { ...p })
  ir(`/productos/${id}`)
}
function actualizar() {
  productoStore.actualizarProducto(productoActual.id, productoActual)
  ir('/productos')
}
function eliminar(id) {
  productoStore.eliminarProducto(id)
}
function agregar(p) {
  carritoStore.agregar(p)
}
function eliminarDelCarrito(id) {
  carritoStore.eliminar(id)
}
function vaciarCarrito() {
  carritoStore.vaciar()
}
function ir(path) {
  router.push(path)
}
</script>


