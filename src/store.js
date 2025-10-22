import { defineStore } from 'pinia'

// Store de productos
export const useProductoStore = defineStore('productos', {
  state: () => ({
    productos: [
      { id: 1, nombre: 'Camiseta', descripcion: '100% algodón', precio: 20 },
      { id: 2, nombre: 'Pantalón', descripcion: 'Denim azul', precio: 35 },
      { id: 3, nombre: 'Zapatillas', descripcion: 'Deportivas', precio: 50 },
      { id: 4, nombre: 'Gorra', descripcion: 'Con visera', precio: 10 },
      { id: 5, nombre: 'Sudadera', descripcion: 'Con capucha', precio: 40 }
    ]
  }),
  actions: {
    crearProducto(p) {
      this.productos.push({ id: Date.now(), ...p })
    },
    actualizarProducto(id, nuevo) {
      const i = this.productos.findIndex(p => p.id == id)
      if (i !== -1) this.productos[i] = { id, ...nuevo }
    },
    eliminarProducto(id) {
      this.productos = this.productos.filter(p => p.id != id)
    }
  },
  getters: {
    obtenerProductoPorId: s => id => s.productos.find(p => p.id == id)
  }
})

// Store de carrito de compras
export const useCarritoStore = defineStore('carrito', {
  state: () => ({ carrito: [] }),
  actions: {
    agregar(producto) {
      const existe = this.carrito.find(p => p.id == producto.id)
      if (existe) existe.cantidad++
      else this.carrito.push({ ...producto, cantidad: 1 })
    },
    eliminar(id) {
      this.carrito = this.carrito.filter(p => p.id != id)
    },
    vaciar() {
      this.carrito = []
    }
  },
  getters: {
    totalArticulos: s => s.carrito.reduce((a, p) => a + p.cantidad, 0),
    totalPrecio: s => s.carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
  }
})
