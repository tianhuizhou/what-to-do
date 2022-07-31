import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// UI css/scss import
import ElementPlus from 'element-plus'
import '@/assets/scss/themes/light.scss'
import 'element-plus/dist/index.css'

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')

// custom global properties setup
app.config.globalProperties.$_cloneDeep = require('lodash/cloneDeep')
import api from './helper/api'
app.config.globalProperties.$api = api
