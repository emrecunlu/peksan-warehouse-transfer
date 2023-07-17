import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './plugins/router'
import store from './store'

const app = createApp(App)

app.use(store).use(router).use(vuetify)

app.mount('#app')
