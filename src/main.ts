import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { key } from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/app.scss'

const app = createApp(App)

app.use(store, key)
app.use(router)

app.mount('#app')
