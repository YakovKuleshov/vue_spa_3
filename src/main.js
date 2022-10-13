import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import HighchartsVue from 'highcharts-vue'

const app = createApp(App)

app.config.globalProperties.$isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

app.use(HighchartsVue)

app.use(store).use(router).mount('#app')
