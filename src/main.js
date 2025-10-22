import { createApp } from 'vue' // main.js
import { createPinia } from 'pinia' 
import router from './router' // router/index.js
import App from './app.vue' // app.vue
import './styles.css' //stylos

const app = createApp(App) 
app.use(createPinia()) 
app.use(router) 
app.mount('#app') // monta la aplicacion en el elemento con id 'app'

