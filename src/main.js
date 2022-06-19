import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Plugins from '@/plugins/plugins.js'
import store from "@/store";

Vue.config.productionTip = false

Vue.use(ElementUI,{size: 'small'})
Vue.use(Plugins)

new Vue({
  render: h => h(App),
  router,
  store,
  Plugins
}).$mount('#app')
