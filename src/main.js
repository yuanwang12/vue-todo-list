import Vue from 'vue'
import ElementUI from 'element-ui'
import router from './router'
import store from './store'
import App from './App.vue'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  store, // 状态管理
  router, // 路由
  render: h => h(App),
}).$mount('#app')
