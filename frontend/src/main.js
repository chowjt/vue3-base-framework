import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import pinia from './stores'
import '@/assets/styles/global.scss'
import directivePermission from './directives/permission'

const app = createApp(App)

app.use(pinia)
app.use(router)

// 注册自定义指令
app.directive('permission', directivePermission)

app.mount('#app')
