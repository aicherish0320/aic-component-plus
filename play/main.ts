import { createApp } from 'vue'
import App from './App.vue'

import '@aic-component-plus/theme-chalk/src/index.scss'
import AcIcon from '@aic-component-plus/components/icon'

const app = createApp(App)
app.use(AcIcon)

app.mount('#app')
