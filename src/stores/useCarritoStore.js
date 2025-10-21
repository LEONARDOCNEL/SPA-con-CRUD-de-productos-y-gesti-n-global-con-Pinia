import { defineStore } from 'pinia'

export const useCarritoStore = defineStore('carrito', {
  state: () => ({ 
    carrito: [] 
  }),
  
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
    },
    
    // ✅ NUEVA ACCIÓN - Maneja toda la lógica del carrito
    agregarAlCarrito(producto) {
      this.agregar(producto)
      // Aquí podrías agregar más lógica: notificaciones, validaciones, etc.
    }
  },
  
  getters: {
    totalArticulos: s => s.carrito.reduce((a, p) => a + p.cantidad, 0),
    totalPrecio: s => s.carrito.reduce((a, p) => a + p.precio * p.cantidad, 0)
  }
})