
import { createApp } from 'vue'
import App from './App.vue'

import VueLatex from './components/VueLatex.js'
import 'katex/dist/katex.min.css'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'

const app = createApp(App)

app.use(router)

app.component('VueLatex', VueLatex)
app.mount('#app')
