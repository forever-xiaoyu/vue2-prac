import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import focus from './directives/focus'

// 按需注册通用组件
import {
  Toast,
  Dialog,
  Tab,
  Tabs
} from 'vant'

Vue.use(Toast, Dialog)
Vue.use(Tab)
Vue.use(Tabs)

// 注册自定义指令
Vue.directive('focus', focus)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
