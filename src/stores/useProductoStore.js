import { defineStore } from 'pinia'

export const useProductoStore = defineStore('productos', {
  state: () => ({
    productos: [
      { id: 1, nombre: 'Camiseta', descripcion: '100% algodón', precio: 120 },
      { id: 2, nombre: 'Pantalón', descripcion: 'Denim azul', precio:135 },
      { id: 3, nombre: 'Zapatillas', descripcion: 'Deportivas', precio:250 },
      { id: 4, nombre: 'Gorra', descripcion: 'Con visera', precio: 100},
      { id: 5, nombre: 'Sudadera', descripcion: 'Con capucha', precio:340 }
    ]
  }),
  
  actions: {
    crearProducto(producto) {
      this.productos.push({ id: Date.now(), ...producto })
    },
    
    actualizarProducto(id, nuevo) {
      const i = this.productos.findIndex(p => p.id == id)
      if (i !== -1) this.productos[i] = { id, ...nuevo }
    },
    
    eliminarProducto(id) {
      this.productos = this.productos.filter(p => p.id != id)
    },
    
    
    crearYReset(producto) {
      this.crearProducto(producto)
      return this.obtenerFormularioVacio()
    },
    
    prepararEdicion(id) {
      const producto = this.obtenerProductoPorId(id)
      return producto ? { ...producto } : null
    },
    
    actualizarYFinalizar(id, producto) {
      this.actualizarProducto(id, producto)
    },
    
    obtenerFormularioVacio() {
      return { nombre: '', descripcion: '', precio: 0 }
    }
  },
  
  getters: {
    obtenerProductoPorId: s => id => s.productos.find(p => p.id == id)
  }
})