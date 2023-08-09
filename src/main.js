import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Particles from "particles.vue3";
import '../src/util/axios.config'

const app = createApp(App)
app.config.globalProperties.$name =  'evollaer'
app.config.globalProperties.$methodTest =  (val)=>{ return val*val }


app
.use(store)
.use(router)
.use(ElementPlus)
.use(Particles)
.mount('#app')
