import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "../node_modules/bootswatch/dist/lumen/bootstrap.min.css";

const app = createApp(App)

app.use(router)

app.mount('#app')
