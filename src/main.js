import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "ant-design-vue/dist/antd.css";
import AntDesignUI from './antdesign.config.js'

require('./mock/index.js')

const app = createApp(App)

AntDesignUI.map(item => {
  app.use(item)
})

app.use(store).use(router).mount('#app')
