import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCodeMirror from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.config.productionTip = false //阻止启动生产消息
Vue.use(VueCodeMirror)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
