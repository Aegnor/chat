import {createApp} from 'vue'
import axios from 'axios'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

axios.defaults.baseURL = 'http://localhost:3030'

createApp(App).use(store).use(router).mount('#app')
