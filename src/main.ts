import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// UI css/scss import
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/scss/themes/light.scss'
const app = createApp(App)

store.dispatch('load_user')

app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')

// custom global properties setup
app.config.globalProperties.$_cloneDeep = require('lodash/cloneDeep')
